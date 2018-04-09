#/bin/bash
cd platforms/android/build/outputs/apk/
echo "Testing App Just Now"
adb connect 192.168.56.101
test-apk
