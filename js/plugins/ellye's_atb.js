// Place file inside /js/plugins
// Remember to save after adding plugins or changing parameters.
//=============================================================================
// Ellye's Active Time Battle
//=============================================================================
/*:
 * Version: 2015-10-30-0404
 *
 * CHANGE LOG:
 * 2015-10-30-0404: Major overhaul on how status are handled. See HELP and/or here: https://ellyeblog.wordpress.com/2015/10/30/status-effects-in-an-atb-system/
 * 2015-10-30-0147: Added parameters for SE playability. Check HELP.
 * 2015-10-30-0021: Rebalanced the duration of status effects - they last 1 turn longer (this actually puts their duration on par with the expected from default combat, due to the different turn structure)
 * 2015-10-29-2330: Added parameters for gauge positions (thanks, djDarkX)
 * 2015-10-28-2300: Implemented iavra's workaround to get parameters without depending on filename.
 * 2015-10-28-2300: Added Gauge Color parameters
 * 2015-10-28-2300: Added Turn Order Prediction interface (WORK IN PROGRESS)
 * Added parameter for random starting ATB bonus.
 * Pre-emptive and surprise attack now function properly.
 * Added starting ATB parameter based on AGI.
 * Fixed battle events set to fire on turn 0+0 not firing (thanks, Kistulot)
 * Fixed dead battlers still gaining ATB.
 * Added the option to display Fight/Escape window.
 * Added a parameter for the gauge name.
 * Added a parameter that allows the developer to select if At-End-Of-Turn effects should happen after an actor takes its action, or for everyone at the end of Turn Timer. (thanks, atreyoray)
 * Corrected a few bugs regarding monsters with the same agility not attacking;
 * Corrected a few bugs regarding Auto-Battle;
 * Corrected a few bugs regarding Status Effects that happened per turn.
 * 
 *
 * @plugindesc A simple Active Time Battle system. Ver. 2015-10-30-0404
 * <Ellye ATB>
 * @author http://steamcommunity.com/id/Ellye
 *
 * @param ===GAMEPLAY===
 * @desc Parameters below this one are Gameplay-related options
 * @default .
 *
 * @param Agility Weight
 * @desc The higher this integer value, the more noticeable the difference of having high Agility vs. low Agility will be. Default 100.
 * @default 100
 *
 * @param Turn Timer
 * @desc Default: 150. The speed at the virtual "turn" value increases - this is relevant for battles with events that happen on the Nth turn, for example, or for monsters that use skills after the Nth turn, etc. The value entered here will be how much "Agility" the turn timer has. This is invisible to the player.
 * @default 150
 *
 * @param Base Fill Speed
 * @desc Default: 100. The base speed that the bar fills by itself, also affect Turn Timer in the same way.
 * @default 100
 *
 *
 * @param Display Fight / Escape at beginning of the battle
 * @desc 1 = yes; 0 = no. Default: 0
 * @default 0
 * 
 * @param Starting ATB
 * @desc Multiplied by Agility and (Agility Weight/100). Default: 50
 * @default 50
 * 
 * @param Starting ATB Random Bonus
 * @desc Maximum random bonus for ATB at battle start. Default: 0
 * @default 0
 * 
 * @param Full ATB Gauge
 * @desc The value of a full ATB Gauge. Default: 50000
 * @default 50000
 * 
 * @param ===SOUND FX===
 * @desc You can override those settings per actor, view HELP.
 * @default .
 * 
 * @param Play SE
 * @desc Whether to play SE when Actor is ready. 0 = OFF; 1 = ON. Default: 0
 * @default 0
 * 
 * @param SE Name
 * @desc The name of the default Sound Effect file (inside /audio/se), sans extension.
 * @default Cursor3
 * 
 * @param SE Volume
 * @desc The default volume for SE (from 0 to 100). Default: 75
 * @default 75
 * 
 * @param SE Pitch
 * @desc The default pitch for SE (from 50 to 150). Default: 100
 * @default 100
 * 
 * @param SE Pan
 * @desc The default pan for the SE (from -100 to 100). Default: 0
 * @default 0
 * 
 * @param ===GAUGE HUD====
 * @desc Parameters below this one are related to the ATB Gauge interface
 * @default .
 *
 * @param Gauge Name
 * @desc What label to show on the ATB gauge.
 * @default AT
 *
 * @param Gauge Color 1
 * @desc First color of the gauge gradient. Default: #505060
 * @default #505060
 *
 * @param Gauge Color 2
 * @desc Second color of the gauge gradient. Default: #D5D5E0
 * @default #D5D5E0
 * 
 * @param ATB Gauge Text Width
 * @desc Width area for the text. Default: 60
 * @default 60
 * 
 * @param Gauge Area Size
 * @desc Width of the area for gauges. Default: 400
 * @default 400
 * 
 * @param ==POS WITH TP==
 * @desc Those affect the positions of gauge when you have TP Display enabled.
 * @default .
 * 
 * @param HP Gauge X Position (with TP)
 * @desc Default: 0
 * @default 0
 * 
 * @param HP Gauge Width (with TP)
 * @desc Default: 97
 * @default 97
 * 
 * @param MP Gauge X Position (with TP)
 * @desc Default: 112
 * @default 112
 * 
 * @param MP Gauge Width (with TP)
 * @desc Default: 86
 * @default 86
 * 
 * @param TP Gauge X Position
 * @desc Default: 213
 * @default 213
 * 
 * @param TP Gauge Width
 * @desc Default: 86
 * @default 86
 * 
 * @param ATB Gauge X Position (with TP)
 * @desc Default: 314
 * @default 314
 * 
 * @param ATB Gauge Width (with TP)
 * @desc Default: 86
 * @default 86
 * 
 * @param ==POS WITHOUT TP==
 * @desc Those affect the positions of gauge when you have TP Display disabled.
 * @default .
 * 
 * @param HP Gauge X Position
 * @desc Default: 0
 * @default 0
 * 
 * @param HP Gauge Width
 * @desc Default: 130
 * @default 130
 * 
 * @param MP Gauge X Position
 * @desc Default: 145
 * @default 145
 * 
 * @param MP Gauge Width
 * @desc Default: 120
 * @default 120
 * 
 * @param ATB Gauge X Position
 * @desc Default: 280
 * @default 280
 * 
 * @param ATB Gauge Width
 * @desc Default: 120
 * @default 120
 *
 * @param ===TURN ORDER HUD===
 * @desc Parameters bellow this one are related to the turn order display
 * @default .
 *
 * @param Display Predicted Turn Order
 * @desc 1 = yes, 0 = no. Default: 0
 * @default 0
 *
 * @param Display as Faces or Names
 * @desc 1 = Faces, 0 = Names. See Help. Default: 0
 * @default 0
 *
 *
 *  
 * @help Actors will act as frequently as their AGILITY attribute allows them to, instead of taking fixed turns.
 * They will have an "AT" Gauge in the interface that goes from 0 to 1000, and they will get a turn to act when it reaches 1000.
 * Gauges are paused while the player is deciding on a command, or while an animation is being played.
 * You can also make skills that interact with the ATB system by using the ".atb" property in the Formula field.
 * For example, a "quick strike" style of skill could have "a.atb+25000;" in its formula.
 * A full gauge requires 50000 ATB (excess ATB is not lost, and the number can be negative).
 * 
 * If you use Display Faces, your enemies require to have a face configured in the Database Editor.
 * In the [Notes] field, you should add, for example: <face_name:Monster><face_id:2> - this would use the RTP Orc face.
 * In that example <face_name> receives the name of the file, and face_id the index of the face, counting left-to-right, top first, then bottom. Starts at 0.
 * 
 * You can set up Actor-specific ready Sound Effects (if you enable Play SE). It's similar to the way monster faces are set up.
 * In the [Notes] field of an actor, you can enter: <se_name:Bow4><se_volume:100><se_pitch:150> to play the sound "Bow4" at those settings whenever that Actor is ready, for example.
 * 
 * Regarding States:
 * If you want a State to count down per action taken, you set it up as Action End.
 * If you want a State to count down per virtual turn, you set it up as Turn End.
 */

//Our plugin needs to be inside a function:
(function() {

    var parameters = $plugins.filter(function(p) { return p.description.contains('<Ellye ATB>'); })[0].parameters; //Thanks to Iavra
    var turn_atb = 0;
    var predicted_turns;
    var ctb_window_width = 90;
    var ctb_window_height = 60;
    var turns_to_predict = Math.floor((SceneManager._boxWidth / ctb_window_width));
    var ctb_window_x_offset = (SceneManager._boxWidth - turns_to_predict * ctb_window_width) / 2;
    var full_atb = Number(parameters['Full ATB Gauge'] || 50000);
    var agi_weight = Number(parameters['Agility Weight'] || 100);
    var turn_timer = Number(parameters['Turn Timer'] || 150);
    var base_atb_increase = Number(parameters['Base Fill Speed'] || 100);
    var gauge_name = String(parameters['Gauge Name'] || "AT");
    var display_party_command = Number(parameters['Display Fight / Escape at beginning of the battle'] || 0);
    var starting_atb = Number(parameters['Starting ATB'] || 50);
    var starting_atb_random = Number(parameters['Starting ATB Random Bonus'] || 0);
    var display_turn_order = Number(parameters['Display Predicted Turn Order'] || 0);
    var display_as_faces_or_names = Number(parameters['Display as Faces or Names'] || 0);
    var atb_gauge_color1 = String(parameters['Gauge Color 1'] || "#505060");
    var atb_gauge_color2 = String(parameters['Gauge Color 2'] || "#D5D5E0");
    var gauge_area_size = Number(parameters['Gauge Area Size'] || 400);
    var gauge_text_width = Number(parameters['ATB Gauge Text Width'] || 60);
    var hp_gauge_x_tp = Number(parameters['HP Gauge X Position (with TP)'] || 0);
    var mp_gauge_x_tp = Number(parameters['MP Gauge X Position (with TP)'] || 112);
    var tp_gauge_x = Number(parameters['TP Gauge X Position'] || 213);
    var atb_gauge_x_tp = Number(parameters['ATB Gauge X Position (with TP)'] || 314);
    var hp_gauge_width_tp = Number(parameters['HP Gauge Width (with TP)'] || 97);
    var mp_gauge_width_tp = Number(parameters['MP Gauge Width (with TP)'] || 86);
    var tp_gauge_width = Number(parameters['TP Gauge Width'] || 86);
    var atb_gauge_width_tp = Number(parameters['ATB Gauge Width (with TP)'] || 86);
    var hp_gauge_x = Number(parameters['HP Gauge X Position'] || 0);
    var mp_gauge_x = Number(parameters['MP Gauge X Position'] || 145);
    var atb_gauge_x = Number(parameters['ATB Gauge X Position'] || 280);
    var hp_gauge_width = Number(parameters['HP Gauge Width'] || 130);
    var mp_gauge_width = Number(parameters['MP Gauge Width'] || 120);
    var atb_gauge_width = Number(parameters['ATB Gauge Width'] || 120);
    var se_enabled = Number(parameters['Play SE'] || 0);
    var se_name = String(parameters['SE Name'] || "Cursor3");
    var se_volume = Number(parameters['SE Volume'] || 75);
    var se_pitch = Number(parameters['SE Pitch'] || 100);
    var se_pan = Number(parameters['SE Pan'] || 0);

    //==================================================
    // INTERFACE
    //==================================================

    //Let's increase the area for gauges in the battlescreen from the default value of 330 to 400.
    Window_BattleStatus.prototype.gaugeAreaWidth = function() {
        return gauge_area_size;
    };

    //let's change the DrawGaugeArea methods, to include our ATB gauge.
    //The version with TP:
    Window_BattleStatus.prototype.drawGaugeAreaWithTp = function(rect, actor) {
        this.drawActorHp(actor, rect.x + hp_gauge_x_tp, rect.y, hp_gauge_width_tp);
        this.drawActorMp(actor, rect.x + mp_gauge_x_tp, rect.y, mp_gauge_width_tp);
        this.drawActorTp(actor, rect.x + tp_gauge_x, rect.y, tp_gauge_width);
        this.drawActorATB(actor, rect.x + atb_gauge_x_tp, rect.y, atb_gauge_width_tp);
    };

    //The version without TP:
    Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function(rect, actor) {
        this.drawActorHp(actor, rect.x + hp_gauge_x, rect.y, hp_gauge_width);
        this.drawActorMp(actor, rect.x + mp_gauge_x, rect.y, mp_gauge_width);
        this.drawActorATB(actor, rect.x + atb_gauge_x, rect.y, atb_gauge_width);
    };

    //Let's create the method that draw the ATB gauge:
    Window_Base.prototype.drawActorATB = function(actor, x, y, width) {
        this.drawGauge(x, y, width, actor.atbRate(), atb_gauge_color1, atb_gauge_color2);
        this.changeTextColor(this.systemColor());
        this.drawText(gauge_name, x, y, gauge_text_width);
    };

    //Let's create the method for calculating ATB percent for the gauge:
    Game_BattlerBase.prototype.atbRate = function() {
        if (typeof this.atb !== 'undefined') {
            if (this.atb / full_atb >= 1)
            {
                return 1;
            }
            return this.atb / full_atb;
        }
        return 0;
    };

    //Some of our interface options use faces for enemies. We use metadata for that. Let's create the method that access it:
    Game_Enemy.prototype.getFaceName = function() {
        if (typeof $dataEnemies[this._enemyId].meta.face_name !== 'undefined')
        {
            return $dataEnemies[this._enemyId].meta.face_name;
        }
        return false;
    };
    Game_Enemy.prototype.getFaceID = function() {
        if (typeof $dataEnemies[this._enemyId].meta.face_id !== 'undefined')
        {
            return $dataEnemies[this._enemyId].meta.face_id;
        }
        return false;
    };

    //Turn Order Window (if selected to be displayed):
    if (display_turn_order)
    {
        //Let's move the Battle Log window down:
        Window_BattleLog.prototype.initialize = function() {
            var width = this.windowWidth();
            var height = this.windowHeight();
            Window_Selectable.prototype.initialize.call(this, 0, ctb_window_height, width, height);
            this.opacity = 0;
            this._lines = [];
            this._methods = [];
            this._waitCount = 0;
            this._waitMode = '';
            this._baseLineStack = [];
            this._spriteset = null;
            this.createBackBitmap();
            this.createBackSprite();
            this.refresh();
        };

        //Correcting a minor mistake in the backdrop of the log window.
        //It works fine for the default position, but not for different positions like we use:
        Window_BattleLog.prototype.createBackSprite = function() {
            this._backSprite = new Sprite();
            this._backSprite.bitmap = this._backBitmap;
            this._backSprite.y = 0;
            this.addChildToBack(this._backSprite);
        };

        //We will add some new windows to Scene Battle:
        //We will have an array of Turn Order windows.
        _Scene_Battle_prototype_createAllWindows = Scene_Battle.prototype.createAllWindows;
        Scene_Battle.prototype.createAllWindows = function() {
            this._turnOrderWindows = [];
            for (index = 0; index < turns_to_predict; index++)
            {
                this._turnOrderWindows.push(new Window_CTB(ctb_window_x_offset + index * ctb_window_width));
                this.addWindow(this._turnOrderWindows[index]);
            }
            BattleManager.setCTBWindowsArray(this._turnOrderWindows);
            _Scene_Battle_prototype_createAllWindows.call(this);
        };

        //Create a new Window for turn order (there will be an array of those)
        function Window_CTB() {
            this.initialize.apply(this, arguments);
        }

        Window_CTB.prototype = Object.create(Window_Base.prototype);
        Window_CTB.prototype.constructor = Window_CTB;

        Window_CTB.prototype.initialize = function(x) {
            Window_Base.prototype.initialize.call(this, x, 0, ctb_window_width, ctb_window_height);
            this.contentsWidth = function() {
                return this.width - this.padding * 2;
            };
            this.contentsHeight = function() {
                return this.height - this.padding * 2;
            };
            if (display_as_faces_or_names === 1)
            {
                this.layoutForFace();
            }
            else
            {
                this.layoutForText();
            }
        };

        //Window layout for face:
        Window_CTB.prototype.layoutForFace = function() {
            this.padding = 2;
            this.opacity = 0;
            this.hideBackgroundDimmer();
            this.layoutApply();
        };

        //Window layout for text:
        Window_CTB.prototype.layoutForText = function() {
            this.padding = 12;
            this.layoutApply();
        };

        //Window layout apply:
        Window_CTB.prototype.layoutApply = function() {
            this.createContents();
            this.contents.fontSize = 12;
            this.contents.paintOpacity = 190;
        };


        //We need to be able to assign a reference to the array of CTB windows to the Battle Manager, so that it can populate it.
        BattleManager.setCTBWindowsArray = function(ctbWindowsArray) {
            this._ctbWindowsArray = ctbWindowsArray;
        };

        //The function that displays turn order:
        BattleManager.displayTurnOrder = function() {
            var predictedTurnOrder = this._predictedTurnOrder;
            if (typeof this._ctbWindowsArray === 'undefined' || this._ctbWindowsArray.constructor !== Array)
            {
                return;
            }
            for (index = 0; index < predictedTurnOrder.length; index++)
            {
                if (index >= this._ctbWindowsArray.length)
                {
                    break;
                }
                var ctbWindow = this._ctbWindowsArray[index];
                var battler = predictedTurnOrder[index];

                //Case text:
                if (display_as_faces_or_names !== 1)
                {
                    var nameToDisplay = battler.isActor() ? battler._name : battler.battlerName() + " " + battler._letter;
                    ctbWindow.contents.clear();
                    ctbWindow.drawText(nameToDisplay, 0, 0, ctb_window_width);
                }
                //Faces:
                else
                {
                    ctbWindow.contents.clear();
                    //For actors, we can just draw faces easily:
                    if (battler.isActor())
                    {
                        ImageManager.loadFace(battler.faceName());
                        ctbWindow.layoutForFace();
                        ctbWindow.drawActorFace(battler, 0, 0, ctb_window_width, ctb_window_height);
                    }
                    //For enemies, we need to check if they have a face set up
                    else if (battler.getFaceName() !== false && battler.getFaceID() !== false)
                    {
                        ImageManager.loadFace(battler.getFaceName());
                        ctbWindow.layoutForFace();
                        ctbWindow.drawFace(battler.getFaceName(), battler.getFaceID(), 0, 0, ctb_window_width, ctb_window_height);
                        ctbWindow.drawText(battler._letter, ctb_window_width / 2, 0, ctb_window_width);
                    }
                    //If they don't, display text:
                    else
                    {
                        ctbWindow.layoutForText();
                        var nameToDisplay = battler.battlerName() + " " + battler._letter;
                        ctbWindow.drawText(nameToDisplay, 0, 0, ctb_window_width);
                    }
                }
            }
        };
    } //End of turn-order-display dependent stuff.
    
    //Play Sound Effect when ATB bar is full, if enabled:
    AudioManager.playFullATB = function(actor) {
        if (se_enabled !== 1)
        {
            return;
        }
        var se = { name:actor.getSEName(), volume:actor.getSEVolume(), pitch:actor.getSEPitch(), pan:actor.getSEPan() };
        AudioManager.playStaticSe(se);
    };
    
    //Get data related to Actor-specific sound, if it exists:
    Game_Actor.prototype.getSEName = function() {
        if (typeof $dataActors[this._actorId].meta.se_name !== 'undefined')
        {
            return $dataActors[this._actorId].meta.se_name;
        }
        return se_name;
    };
    Game_Actor.prototype.getSEVolume = function() {
        if (typeof $dataActors[this._actorId].meta.se_volume !== 'undefined')
        {
            return $dataActors[this._actorId].meta.se_volume;
        }
        return se_volume;
    };
    Game_Actor.prototype.getSEPitch = function() {
        if (typeof $dataActors[this._actorId].meta.se_pitch !== 'undefined')
        {
            return $dataActors[this._actorId].meta.se_pitch;
        }
        return se_pitch;
    };
    Game_Actor.prototype.getSEPan = function() {
        if (typeof $dataActors[this._actorId].meta.se_pan !== 'undefined')
        {
            return $dataActors[this._actorId].meta.se_pan;
        }
        return se_pan;
    };

    //==================================================
    // SYSTEM
    //==================================================

    //Let's add a new property for battlers, called "atb":
    Object.defineProperties(Game_BattlerBase.prototype, {
        atb: {
            writable: true,
            value: 0,
            configurable: true,
            enumerable: true
        }
    });

    //At the start of battle, ATB values are reset to 0:
    _Game_Battler_prototype_onBattleStart = Game_Battler.prototype.onBattleStart;
    Game_Battler.prototype.onBattleStart = function() {
        this.atb = (Math.random() * starting_atb_random) + starting_atb * this.agi * (agi_weight / 100);
        if (BattleManager._surprise && this.isEnemy() && this.isAppeared())
        {
            this.atb += full_atb;
        }
        else if (BattleManager._preemptive && this.isActor())
        {
            this.atb += full_atb;
        }
        _Game_Battler_prototype_onBattleStart.call(this);
    };

    //Battle starts in the new phase "atb" (except if we're going to show PartyCommand)
    _BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        _BattleManager_startBattle.call(this);
        $gameParty.makeActions();
        $gameTroop.makeActions();
        this.makeActionOrders();
        predicted_turns = this.predictTurnOrder();
        this._phase = 'start';
        this._actorIndex = -1;
        this._pending_atb_removal = false;
    };

    //Skip party command if the player so wishes:
    if (display_party_command !== 1)
    {
        Scene_Battle.prototype.startPartyCommandSelection = function() {
            this.refreshStatus();
            this.commandFight();
        };
    }

    //Change the end of turn:
    BattleManager.updateTurnEnd = function() {
        $gameParty.makeActions();
        $gameTroop.makeActions();
        this._phase = 'atb';
    };

    //Changing the flow of battle
    _BattleManager_update = BattleManager.update;
    BattleManager.update = function() {
        if (!this.isBusy() && !this.updateEvent())
        {
            switch (this._phase)
            {
                case 'atb':
                    this.increaseAtbGauges();
                    break;
                default:
                    _BattleManager_update.call(this);
                    break;
            }
        }
    };

    //Increases the ATB gauges when idle:
    BattleManager.increaseAtbGauges = function() {
        turn_atb += (base_atb_increase + turn_timer * (agi_weight / 100));
        if (turn_atb >= full_atb)
        {
            turn_atb -= full_atb;
            $gameTroop.increaseTurn();
            this.allBattleMembers().forEach(function(battler)
            {
                battler.onTurnEnd();
                this.refreshStatus();
                this._logWindow.displayAutoAffectedStatus(battler);
                this._logWindow.displayRegeneration(battler);
            }, this);
        }
        this.allBattleMembers().forEach(function(battler)
        {
            if (battler.isDead())
            {
                battler.atb = 0;
            }
            else
            {
                battler.atb += (base_atb_increase + battler.agi * (agi_weight / 100));
            }
            if (battler.atb >= full_atb)
            {
                this.battlerHasFullAtb(battler);
            }
        }, this);
        this.refreshStatus();
    };

    //When a Battler (might be party or enemy) has full ATB:
    BattleManager.battlerHasFullAtb = function(battler) {
        predicted_turns = this.predictTurnOrder();
        this._subject = battler;
        this._turn_end_subject = battler;
        this._pending_atb_removal = true;
        if (battler.isActor())
        {
            battler.makeActions();
            if (battler.canInput())
            {
                AudioManager.playFullATB(battler);
                this._actorIndex = battler.index();
                this._phase = 'input';
            }
            else
            {
                this._phase = 'turn';
            }
        }
        else if (battler.isEnemy())
        {
            battler.makeActions();
            this._phase = 'turn';
        }
    };

    //Never jumps to another battler, we will control them individually:
    BattleManager.getNextSubject = function() {
        return null;
    };

    //Process turn when we finish inputing command
    BattleManager.selectNextCommand = function() {
        do {
            if (!this.actor() || !this.actor().selectNextCommand()) {
                this._phase = 'turn';
                $gameParty.requestMotionRefresh();
                break;
            }
        } while (!this.actor().canInput());
    };

    //Don't let us jump to another character by cancelling.
    BattleManager.selectPreviousCommand = function() {
        do {
            if (!this.actor() || !this.actor().selectPreviousCommand()) {
                return;
            }
        } while (!this.actor().canInput());
    };

    //We need to change the OnTurnEnd method, because otherwise it will apply to all battlers whenever anyone acts:
    BattleManager.endTurn = function() {
        this._phase = 'turnEnd';
        this._preemptive = false;
        this._surprise = false;
        predicted_turns = this.predictTurnOrder();
    };


    //Remove the ATB value when a turn is processed:
    _BattleManager_processTurn = BattleManager.processTurn;
    BattleManager.processTurn = function() {
        if (this._pending_atb_removal === true)
        {
            this._subject.atb -= full_atb;
            this._pending_atb_removal = false;
        }
        _BattleManager_processTurn.call(this);
    };

    //We'll need a function to predict the turn order for the next few turns, in case the developer wants to display this:
    BattleManager.predictTurnOrder = function(battlerToApplyModifierTo, modifierValue)
    {
        if (display_turn_order !== 1)
        {
            return null;
        } 
        if (typeof battlerToApplyModifierTo === 'undefined') {
            battlerToApplyModifierTo = false;
        }
        if (typeof modifierValue === 'undefined') {
            modifierValue = 0;
        }
        var numberOfTurns = turns_to_predict;
        var mmodifierValue = Number(mmodifierValue) || 0;
        var arrayOfATBValues = [];
        var arrayOfAGIValues = [];
        var predictedTurnOrder = [];
        if (numberOfTurns === 0)
        {
            return false;
        }
        //We cannot work directly on our Battlers for this simulation, or else we would mess their values
        //So instead we copy the numbers that are necessary, and we use them.
        this.allBattleMembers().forEach(function(battler)
        {
            if (battler.isDead() || battler.isHidden())
            {
                //We skip this one if it's dead or hidden (can't use continue inside Foreach on JS, so let's go with this approach).
            }
            else
            {
                var mod = 0;
                //Apply the modifier for move prediction (when the player hovers a skill that changes his ATB)
                if (battlerToApplyModifierTo === battler)
                {
                    mod = modifierValue;
                }
                arrayOfATBValues.push(battler.atb + mod);
                arrayOfAGIValues.push(battler.agi);
            }
        });
        //Now we simulate until we have enough turns:
        while (predictedTurnOrder.length < numberOfTurns)
        {
            for (index = 0; index < arrayOfATBValues.length; index++)
            {
                arrayOfATBValues[index] += (base_atb_increase + arrayOfAGIValues[index] * (agi_weight / 100));
                if (arrayOfATBValues[index] >= full_atb)
                {
                    arrayOfATBValues[index] -= full_atb;
                    predictedTurnOrder.push(this.allBattleMembers()[index]);
                }
            }
        }
        predictedTurnOrder = predictedTurnOrder.slice(0, numberOfTurns);
        //Let's show them in our CTB Windows, if they are being used:
        this._predictedTurnOrder = predictedTurnOrder;
        if (display_turn_order)
        {
            this.displayTurnOrder();
        }
        return predictedTurnOrder;
    };
    
    //At the end of Turns Timers, we only reduce the duration of states set to Turn End:
    _Game_Battler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
    Game_Battler.prototype.onTurnEnd = function() {
        this.updateStateTurns(2);
        _Game_Battler_onTurnEnd.call(this);
    };
    
    //Because we now reduce the duration of states set to Action End on the end of actions (after, not before, checking for removal of previous one):
    _Game_Battler_On_AllActionsEnd = Game_Battler.prototype.onAllActionsEnd;
    Game_Battler.prototype.onAllActionsEnd = function() {
        this.updateStateTurns(1);
        _Game_Battler_On_AllActionsEnd.call(this);
    };
    
    //This now receives a parameter for timing.
    Game_BattlerBase.prototype.updateStateTurns = function(timing) {
        if (typeof timing === 'undefined')
        {
            return;
        }
        this._states.forEach(function(stateId) {
            if (this._stateTurns[stateId] > 0 && $dataStates[stateId].autoRemovalTiming === timing) {
                this._stateTurns[stateId]--;
            }
        }, this);
    };
})();