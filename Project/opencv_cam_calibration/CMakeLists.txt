cmake_minimum_required(VERSION 3.12)  # 推荐更新版本以支持更多特性

project(camera_calibration VERSION 0.1 LANGUAGES CXX)

# 设置安装目录前缀
set(PREFIX ${CMAKE_INSTALL_PREFIX})

# 输出路径设置
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)

# 查找 OpenCV 库
find_package(OpenCV REQUIRED)

# 包含头文件和源文件路径
include_directories(src ${OpenCV_INCLUDE_DIRS})

# 指定源文件
set(SOURCES src/camera_calibration.cpp)

# 创建可执行文件
add_executable(${PROJECT_NAME} ${SOURCES})

# 链接 OpenCV 库
target_link_libraries(${PROJECT_NAME} PRIVATE ${OpenCV_LIBS})

# 安装路径配置
install(TARGETS ${PROJECT_NAME} DESTINATION ${CMAKE_INSTALL_PREFIX}/bin)
install(DIRECTORY src/ DESTINATION ${CMAKE_INSTALL_PREFIX}/include)
install(DIRECTORY ${CMAKE_SOURCE_DIR}/data/ DESTINATION ${CMAKE_INSTALL_PREFIX}/data)
