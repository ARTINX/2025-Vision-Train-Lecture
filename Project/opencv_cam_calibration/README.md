Preparation
====
1) data 文件夹下修改你的经过海康相机拍摄记录的图片配置文件的目录
```xml
<Input>"(你自己的前置目录)/opencv_cam_calibration/images/imageLists.xml"</Input>
```
2) images 文件夹下存放你的图片和imageLists.xml 配置文件，并在imageLists文件夹中添加图片的路径，最好改绝对的路径(qwq).现已给出了一个例子，可以参考格式。

Execution
================

1) mkdir build

2) cd build

3) cmake ..
(若要命令行链接vcpkg库 前三步骤可以总结为)
```cpp
cmake -Bbuild -S. 
-DCMAKE_TOOLCHAIN_FILE:STRING=(你自己的前置目录)/vcpkg/scripts/buildsystems/vcpkg.cmake && cd build
```

4) make

5) cd bin

6) ./camera_calibration ../../data/camera_conf.xml 

7) 等待标定结束，标定数据文件会导出到达 /build/bin/ 文件夹下 

