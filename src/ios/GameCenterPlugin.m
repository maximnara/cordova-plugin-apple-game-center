#import "GameCenterPlugin.h"
#import <Cordova/CDV.h>

@interface GameCenterPlugin ()
@property (nonatomic, retain) GKLeaderboardViewController *leaderboardController;
@property (nonatomic, retain) GKAchievementViewController *achievementsController;
@end

@implementation GameCenterPlugin

#pragma mark - CDVPlugin

/**
 * Login
 * @params {CDVInvokedUrlCommand} command
 */
- (void)login:(CDVInvokedUrlCommand *)command {
        [[GKLocalPlayer localPlayer] setAuthenticateHandler: ^(UIViewController *viewcontroller, NSError *error) {
            //It turns out that you need to go to Settings>Game Center and manually enable Sandbox.
            //http://stackoverflow.com/questions/25916055/application-is-not-recognized-by-game-center-after-building-with-xcode-6-0-1
            if (viewcontroller != nil) {
                CDVViewController *vc = (CDVViewController *)[super viewController];
                [vc presentViewController:viewcontroller animated:YES completion:^{
                }];
            }
            else {
                //already logged in
                if ([GKLocalPlayer localPlayer].authenticated) {
                    NSString *playerID = [GKLocalPlayer localPlayer].playerID;
                    NSString *displayName = [GKLocalPlayer localPlayer].displayName;

                    NSDictionary* playerDetail = @{
                                                   @"playerId":playerID,
                                                   @"playerDisplayName":displayName
                                                   };

                    CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:playerDetail];
                    [self.commandDelegate sendPluginResult:pr callbackId:command.callbackId];
                }
                else {
                    if (error != nil) {
                        UIAlertView *alert4 = [[UIAlertView alloc] initWithTitle:@"Alert" message:[error localizedDescription] delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
                        [alert4 show];
                        CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
                        [self.commandDelegate sendPluginResult:pr callbackId:command.callbackId];
                    }
                    else {
                        NSString *playerID = [GKLocalPlayer localPlayer].playerID;
                        NSString *displayName = [GKLocalPlayer localPlayer].displayName;

                        NSDictionary* playerDetail = @{
                                                       @"playerId":playerID,
                                                       @"playerDisplayName":displayName
                                                       };

                        CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:playerDetail];
                        [self.commandDelegate sendPluginResult:pr callbackId:command.callbackId];
                    }
                }
            }
        }];
}

- (void)unlockAchievement:(CDVInvokedUrlCommand *)command {
    NSString *achievementId = [command argumentAtIndex:0];

    GKAchievement *achievement = [[GKAchievement alloc] initWithIdentifier:achievementId];
    if (achievement)
    {
        achievement.percentComplete = 100;
        achievement.showsCompletionBanner = YES;

        //[GKAchievement reportAchievements:[NSArray arrayWithObjects:achievement] withCompletionHandler: ^(NSError *error)
        [achievement reportAchievementWithCompletionHandler: ^(NSError *error)
        {
             if (error != nil)
             {
                 NSLog(@"ACHIEVEMENT: ERROR");
                 NSLog([error localizedDescription]);
                CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
                [self.commandDelegate sendPluginResult:pr callbackId:command.callbackId];
            }
             else {
                 NSLog(@"ACHIEVEMENT: SUCCESS");
                CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
                [self.commandDelegate sendPluginResult:pr callbackId:command.callbackId];
             }
        }];
    } else {
        NSLog(@"NO ACHIEVEMENT");
    }
}

- (void)incrementAchievement:(CDVInvokedUrlCommand *)command {
    NSString *achievementId = [command.arguments objectAtIndex:0];
    NSString *stepsOrPercent = [command.arguments objectAtIndex:1];
    float stepsOrPercentFloat = [stepsOrPercent floatValue];

    GKAchievement *achievement = [[GKAchievement alloc] initWithIdentifier: achievementId];
    if (achievement)
    {
        achievement.percentComplete = stepsOrPercentFloat;

        [achievement reportAchievementWithCompletionHandler: ^(NSError *error)
        {
             if (error != nil)
             {
                CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
                [self.commandDelegate sendPluginResult:pr callbackId:command.callbackId];
            }
             else {
                CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
                [self.commandDelegate sendPluginResult:pr callbackId:command.callbackId];
             }
        }];
    }
}

- (void)showAchievements:(CDVInvokedUrlCommand *)command {
    if ( self.achievementsController == nil ) {
        self.achievementsController = [[GKAchievementViewController alloc] init];
        self.achievementsController.achievementDelegate = self;//
    }
    CDVViewController *vc = (CDVViewController *)[super viewController];
    [vc presentViewController:self.achievementsController animated:YES completion: ^{
    }];

    CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pr callbackId:command.callbackId];
}

- (void)gameCenterViewControllerDidFinish:(GKGameCenterViewController *)gameCenterViewController {
    [gameCenterViewController dismissViewControllerAnimated:YES completion:nil];
}

@end
