#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>
#import <GameKit/GameKit.h>

@interface GameCenterPlugin : CDVPlugin <GKGameCenterControllerDelegate>

- (void)login:(CDVInvokedUrlCommand *)command;
- (void)unlockAchievement:(CDVInvokedUrlCommand *)command;
- (void)showAchievements:(CDVInvokedUrlCommand *)command;

@end
