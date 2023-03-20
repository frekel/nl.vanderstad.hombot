# LG Hombot support for Homey (SDK3)

The LG Hombot/VParquet vacuum cleaner does NOT have network-capabilities by default. However, since it has a USB port, you can upgrade the firmware, load custom firmware and equip it with a Wi-Fi dongle. How to do this is explained here:
- Dutch: http://www.domotica.center/robotstofzuiger-lg-hombot-vparquet/
- German: http://www.roboter-forum.com/showthread.php?10009-LG-Hombot-3-0-(VR6260-VR6270-VR6340)-WLAN-Steuerung-per-Weboberfl%E4che
- English: http://www.roboter-forum.com/showthread.php?10009-LG-Hombot-3-0-%28VR6260-VR6270-VR6340%29-WLAN-Steuerung-per-Weboberfl%E4che&p=107354&viewfull=1#post107354

If you don't do this, you cannot control the vacuum cleaner with Homey using this app.

***
### A huge thanks goes to *Chamid Media* for his excellent first app! 

***
- This app could not have existed without the original creator of this app: *Chamid Media*.   
- This is complete rewrite of his excellent app, so it complies with the latest SDK (v3).  
- Local discovery is added, so you should be able to find the vacuum automatically.
***

The following  card are enabled in flows:
- [ACTION] Start cleaning (vacuum capability)
- [ACTION] Pause cleaning (vacuum capability)
- [ACTION] Return to docking station. (vacuum capability)
- [ACTION] Start spot cleaning. (vacuum capability)
- [ACTION] Set clean mode (zigzag, spiral spot, cell by cell) (app specific)
- [ACTION] Set turbo on/off (app specific)
- [ACTION] Set repeat on/off (app specific)

- [CONDITION] Is (not) cleaning
- [CONDITION] Is (not) spot_cleaning
- [CONDITION] Is (not) docked
- [CONDITION] Is (not) charging
- [CONDITION] Is (not) stopped

# Changelog
**Version 0.9.8:**
- First release
- Refactored LG Hombot from Chamid Media to SDK 3

