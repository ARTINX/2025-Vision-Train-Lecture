# Source
## Daemon
代码分析：守护线程 make_behavior 的重要实现
make_behavior 是 CAF 中定义 Actor 行为的核心方法，它描述了该 Actor 如何响应不同类型的消息。在这段代码中，DaemonActor 的 make_behavior 方法主要处理守护线程相关的重要功能，包括启动守护进程、重新加载配置、以及监控其他 Actor 的状态。

代码解析
1. start_atom 消息：启动守护进程
cpp
复制代码
[this](start_atom) {
    ACTOR_PROTOCOL_CHECK(start_atom);
    mStarted = true;
},
功能：启动守护进程，并设置 mStarted 为 true，表明守护线程已激活。
重要性：这是整个守护进程的起点，其它功能通常基于守护线程的启动状态执行。
2. monitor_response_atom 消息：监控消息的处理（目前未定义具体行为）
cpp
复制代码
[](monitor_response_atom) { 
    ACTOR_PROTOCOL_CHECK(monitor_response_atom); 
},
功能：作为响应监控的占位符，确保通信协议完整性。
扩展性：未来可以通过该消息处理守护线程的监控反馈逻辑。
3. reload_all_config_atom 消息：重新加载所有配置
cpp
复制代码
[this](reload_all_config_atom) {
    ACTOR_PROTOCOL_CHECK(reload_config_atom);
    logInfo("Start reloading config for all actors");
    std::shared_lock lock{ mLatch };
    caf::scoped_actor caller{ gSystem.get() };
    for(auto& actorInfo : gActors.get()) {
        caller->send(actorInfo.second, reload_config_atom_v);
    }
},
功能：
接收到 reload_all_config_atom 消息后，重新加载所有 Actor 的配置。
使用 scoped_actor 来确保线程安全并发送 reload_config_atom_v 消息给每个 Actor。
关键点：
通过 shared_lock 实现线程安全访问。
对 gActors 中的每个 Actor 发送重新加载配置的指令。
场景：当系统配置需要动态更新时调用。
4. set_down_handler 方法：处理监控的 Actor 崩溃
cpp
复制代码
set_down_handler([this](const caf::down_msg& msg) {
    if (globalStatus != RunStatus::running) {
        return;
    }
    std::unique_lock lock{ mLatch };
    const auto actorName = mActorsAddr[msg.source];
    mActorsAddr.erase(msg.source);
    lock.unlock();
    logError(fmt::format("Actor {} down: {}", actorName, caf::to_string(msg.reason)));
    HubLogger::visualLog(fmt::format("Actor {} down: {}", actorName, caf::to_string(msg.reason)));
    restartActor(actorName);
});
功能：监控注册的 Actor，如果发现 Actor 崩溃或退出，记录日志并尝试重启。
细节：
通过 mLatch 锁机制确保线程安全。
记录崩溃的 Actor 信息，并调用 restartActor 方法重新启动该 Actor。
崩溃原因通过 caf::to_string(msg.reason) 记录。
5. restartActor 方法：重启崩溃的 Actor
cpp
复制代码
void restartActor(const std::string& actorId) {
    auto& registry = gSystem.get().registry();
    const auto nodesConfig = gConfigHelper->getConfig().to_dictionary().value();
    caf::config_value actorConfig;
    for (auto&& [name, subConfig] : nodesConfig) {
        if (name == actorId) {
            actorConfig = subConfig;
            break;
        }
    }
    registry.erase(actorId);
    caf::scoped_actor caller{ gSystem.get() };

    std::lock_guard guard{ mLatch };
    std::for_each(gActors.get().begin(), gActors.get().end(), [&, instance = this, this](auto& actorInfo) {
        if (actorInfo.first == actorId) {
            caller->send_exit(actorInfo.second, caf::exit_reason::unreachable);
            actorInfo.second = std::move(gFactory->buildNode(gSystem.get(), actorId, actorConfig));
            instance->monitor(actorInfo.second);
            mActorsAddr.emplace(actorInfo.second.address(), actorId);
        }
    });
    for (const auto& actorInfo : gActors.get()) {
        caller->send(actorInfo.second, reload_address_atom_v);
    }
}
功能：根据 Actor ID 查找配置，重新初始化并替换崩溃的 Actor。
重要实现：
查找并加载崩溃 Actor 的配置。
删除旧的注册信息，通过 send_exit 发送退出消息给崩溃 Actor。
调用工厂方法 buildNode 创建新的 Actor，并将其注册到守护线程的监控列表中。
通知其它 Actor 地址更新。

## factory mode 
工厂设计中的重要机制
动态注册：

通过 addNodeType 方法动态注册新节点类型，并绑定生成函数。
节点类型与其构造器分离，支持后续扩展新类型。
类型查找与构造：

buildNode 方法通过节点配置文件解析节点类型，利用注册的构造函数动态创建节点。
异常保护：

捕获并记录构造节点过程中的异常，避免系统崩溃。

注册组件：利用 registerComponent 函数，将组件的生成逻辑注册到全局的 NodeFactory。

解析配置：利用 parseSucceed 函数，从 HubConfig 中提取成功的 Actor 名称。
根据名称列表解析出 Actor 地址及分组信息，供系统进一步使用。