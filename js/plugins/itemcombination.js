//=============================================================================
// ItemCombination.js
//=============================================================================

/*:
 * @plugindesc Creates an item combination system.
 * @author Jeremy Cannady
 *
 *
 * @help creates Item combo system.
 *
 *
 *
	NoteTags
	<comboChance:0.95>     	where 0.95 is 95%
	<comboIngredient1:1,1>  where you require one item #1 
	<comboIngredient2:2,3>	where you require three of item #2
	<comboFail:4>			If you fail you make item #4
	
	Plugin Commands
	no spaces and the exact format, must have comboChance, at least one ingredient and the combo fail or will crash
	itemComboForget 1    	where you forget the recipe to combine item #1 which is a recipe
	itemComboLearn 5		where you learn the recipe to make item #5
	itemComboChanceChange 7,0.5	where you change item# 7 chance to combine to 0.5 which is 50%
	ItemComboMenuEnabled true	where true or false enables the menu option or not
 *
 *
*/




(function(){

var copyOfAddOrginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	copyOfAddOrginalCommands.call(this)
	var enabled = this.isItemComboEnabled();
	if(enabled){
	this.addCommand('Combine', 'itemCombinationCommand', enabled);
};
};

Window_MenuCommand.prototype.isItemComboEnabled = function() {
	if(Game_Party.prototype._craftingLearnedRecipes.length < 1 ){
		return false;
	}else if(Game_Party.prototype._CombineMenuEnabled != true){
		return false;
	}else{
	return true
	};
};

Game_Party.prototype._CombineMenuEnabled = true;

var copyOfCreateCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	copyOfCreateCommandWindow.call(this);
	this._commandWindow.setHandler('itemCombinationCommand',    this.commandCombinationMenu.bind(this));
};

Scene_Menu.prototype.commandCombinationMenu = function() {
    SceneManager.push(Scene_CraftingMenu);
};

Game_Party.prototype._craftingRecipes = {};

var copyOfInitializeCombo = Game_Party.prototype.initialize;

Game_Party.prototype.initialize = function() {
    copyOfInitializeCombo.call(this);
	this.populateCraftingRecipes();
};

Game_Party.prototype.populateCraftingRecipes = function() {
	var lengthOfItemList = $dataItems.length;
		
	for(var i = 1; i < lengthOfItemList; i++){
	var ingredientArray = [];

	if(typeof $dataItems[i].meta.comboChance !== "undefined"){
			ingredientArray.push(Number($dataItems[i].id));
			ingredientArray.push(Number($dataItems[i].meta.comboChance));
			ingredientArray.push(Number($dataItems[i].meta.comboFail));
		};
		if(typeof $dataItems[i].meta.comboIngredient1 !== "undefined"){
			var ingredientArrayIngredient = $dataItems[i].meta.comboIngredient1.split(',');
			for(var j=0; j<2; j++) {
			ingredientArrayIngredient[j] = parseInt(ingredientArrayIngredient[j], 10);};
			ingredientArray.push(ingredientArrayIngredient);
		};
		if(typeof $dataItems[i].meta.comboIngredient2 !== "undefined"){
			var ingredientArrayIngredient = $dataItems[i].meta.comboIngredient2.split(',');
			for(var j=0; j<2; j++) {
			ingredientArrayIngredient[j] = parseInt(ingredientArrayIngredient[j], 10);};
			ingredientArray.push(ingredientArrayIngredient);
		};
		if(typeof $dataItems[i].meta.comboIngredient3 !== "undefined"){
			var ingredientArrayIngredient = $dataItems[i].meta.comboIngredient3.split(',');
			for(var j=0; j<2; j++) {
			ingredientArrayIngredient[j] = parseInt(ingredientArrayIngredient[j], 10);};
			ingredientArray.push(ingredientArrayIngredient);
		};
		if(typeof $dataItems[i].meta.comboIngredient4 !== "undefined"){
			var ingredientArrayIngredient = $dataItems[i].meta.comboIngredient4.split(',');
			for(var j=0; j<2; j++) {
			ingredientArrayIngredient[j] = parseInt(ingredientArrayIngredient[j], 10);};
			ingredientArray.push(ingredientArrayIngredient);
		};
		if(typeof $dataItems[i].meta.comboIngredient5 !== "undefined"){
			var ingredientArrayIngredient = $dataItems[i].meta.comboIngredient5.split(',');
			for(var j=0; j<2; j++) {
			ingredientArrayIngredient[j] = parseInt(ingredientArrayIngredient[j], 10);};
			ingredientArray.push(ingredientArrayIngredient);
		};
		
		if(typeof $dataItems[i].meta.comboChance !== "undefined"){
		Game_Party.prototype._craftingRecipes[$dataItems[i].name] = ingredientArray;
		}
		else{}	
		};		
};

Game_Party.prototype._craftingLearnedRecipes = [];

Game_Party.prototype.canCombine = function(value){
	var recipeKeyName = value;
	var ingredientArray = Game_Party.prototype.ingredients(recipeKeyName);
	var numberOfRequiredIngredients = ingredientArray.length;

	var ingredientArrayNames = [];
	var recipe = $dataItems[itemNumber]

	var haveAllIngredients = 0;
	
		for(i =0;i< numberOfRequiredIngredients;i++){
		
			var itemNumber = ingredientArray[i][0];
			var requiredAmount = ingredientArray[i][1];
			var ingredient = $dataItems[itemNumber];

			ingredientArrayNames.push(ingredient);
			if ($gameParty.numItems(ingredient) >= requiredAmount){
				haveAllIngredients += 1;
			};
		};
			if(haveAllIngredients == numberOfRequiredIngredients){
				return true;
			}
			else{
			return false; 
			};
};

Game_Party.prototype.learnRecipe = function(value) {
	if(this._craftingLearnedRecipes.indexOf(value) === -1){
		this._craftingLearnedRecipes.push(value);
	};
};

Game_Party.prototype.forgetRecipe = function(value) {
	//Stores the value of the index, if the value is -1 then we do not have the recipe.
	var index = this._craftingLearnedRecipes.indexOf(value);
	//If we do have the recipe learned then delete it from out learned recipes list.
	if(this._craftingLearnedRecipes.indexOf(value) != -1){
		this._craftingLearnedRecipes.splice(index,1);
	};
};

Game_Party.prototype.changeItemComboChance = function(recipeName, newChance) {
	var recipeDetails = Game_Party.prototype._craftingRecipes[recipeName];
	recipeDetails[1] = newChance;
};

Game_Party.prototype.ingredients = function(recipeKeyName){
	var recipeDetails = Game_Party.prototype._craftingRecipes[recipeKeyName];
	var numberOfIngredients = recipeDetails.length;
	var ingredientsList =[];
	for(i = 3; i < numberOfIngredients; i++){
		var itemNumber = recipeDetails[i];
		ingredientsList.push(itemNumber);
	};
	return ingredientsList;
};

function craftingTitleWindow() {
    this.initialize.apply(this, arguments);
};

craftingTitleWindow.prototype = Object.create(Window_Base.prototype);
craftingTitleWindow.prototype.constructor = craftingTitleWindow;

craftingTitleWindow.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
	Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.update();
};

craftingTitleWindow.prototype.windowWidth = function() {
    return 816;
};

craftingTitleWindow.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

craftingTitleWindow.prototype.drawCraftingTitle = function( x, y, width) {
    var unitWidth = Math.min(80);
    this.resetTextColor();
    this.drawText("Item Combination Menu", x, y, width - unitWidth - 6, 'left');
    this.changeTextColor(this.systemColor());
   };
   
craftingTitleWindow.prototype.update = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
	this.drawCraftingTitle( 0, 0, width);

};

craftingTitleWindow.prototype.open = function() {
    this.update();
    Window_Base.prototype.open.call(this);
};

function craftingListWindow() {
    this.initialize.apply(this, arguments);
}

craftingListWindow.prototype = Object.create(Window_Command.prototype);
craftingListWindow.prototype.constructor = craftingListWindow;
craftingListWindow.prototype.canCombine = false;

craftingListWindow.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
    this.selectLast();
};

craftingListWindow.prototype.update = function() {
	Window_Command.prototype.update.call(this);

 };
 
craftingListWindow.initCommandPosition = function() {
    this._lastCommandSymbol = null;
};

craftingListWindow.prototype.windowWidth = function() {
    return 240;
};

craftingListWindow.prototype.windowHeight = function() {
    return 552;
};

craftingListWindow.prototype.numVisibleRows = function() {
    return this.maxItems();
};

craftingListWindow.prototype.makeCommandList = function() {
    this.addOriginalCommands();
};

craftingListWindow.prototype.addOriginalCommands = function() {
  	var numberOfLearnedRecipes = Game_Party.prototype._craftingLearnedRecipes;

	for(var i = 0; i < numberOfLearnedRecipes.length; i++){
		var recipeKeyName = Game_Party.prototype._craftingLearnedRecipes[i];
		var enabled = Game_Party.prototype.canCombine(recipeKeyName);
		var recipeDetails = Game_Party.prototype._craftingRecipes[recipeKeyName];
		var itemNumber = recipeDetails[0];
		var recipeName = $dataItems[itemNumber];
		this.addCommand(recipeName.name, recipeName.name, enabled);
	};
 };
 
craftingListWindow.prototype.isCurrentItemEnabled = function(){
	var recipeKeyName = Game_Party.prototype._craftingLearnedRecipes[craftingDetailsWindow.prototype.currentItemIndex];
	var enabled = Game_Party.prototype.canCombine(recipeKeyName)
	return enabled;
};

craftingListWindow.prototype.processOk = function() {
    craftingListWindow._lastCommandSymbol = this.currentSymbol();
    Window_Command.prototype.processOk.call(this);
};

craftingListWindow.prototype.selectLast = function() {
    this.selectSymbol(craftingListWindow._lastCommandSymbol);
};

function craftingDetailsWindow() {
    this.initialize.apply(this, arguments);
};

craftingDetailsWindow.prototype = Object.create(Window_Command.prototype);

craftingDetailsWindow.prototype.constructor = craftingDetailsWindow;
craftingDetailsWindow.prototype.currentItemIndex = 0;

craftingDetailsWindow.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
	this.deactivate();
	this.deselect();
};

craftingDetailsWindow.prototype.windowWidth = function() {
    return 576;
};

craftingDetailsWindow.prototype.windowHeight = function() {
    return 552;
};

craftingDetailsWindow.prototype.update = function() {
	Window_Command.prototype.update.call(this);
    this.contents.clear();
	this.drawDetailsName(0, 0, this.windowWidth());
	this.drawDetailsDescription(0, 100, this.windowWidth());
	this.drawIngredient(0,200-28,this.windowWidth()/2);
	this.drawComboChance(0,400,this.windowWidth());
	this.drawDetailsIngredients(0, 200, this.windowWidth()/2);
	this.drawItem(0);
};

craftingDetailsWindow.prototype.maxItems = function() {
    return 1;
};

craftingDetailsWindow.prototype.maxCols = function(){
return 1;
};

craftingDetailsWindow.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.textWidth('Combine');
    rect.height = this.itemHeight();
    rect.x = this.windowWidth()/2-rect.width+32;
    rect.y = 450;
    return rect;
};

craftingDetailsWindow.prototype.drawDetailsName = function(x, y, width) {
    this.resetTextColor();
	var unitWidth = Math.min(80);

	var recipeKeyName = Game_Party.prototype._craftingLearnedRecipes[this.currentItemIndex];
	var recipeDetails = Game_Party.prototype._craftingRecipes[recipeKeyName];
	
	var itemNumber = recipeDetails[0];
	var recipe = $dataItems[itemNumber]
	
	this.drawText(recipe.name, x, y, this.windowWidth() -32, 'center');
    this.changeTextColor(this.systemColor());
	this.drawIcon(recipe.iconIndex, this.windowWidth()/2-32, y+50);
};

craftingDetailsWindow.prototype.drawIngredient = function(x, y, width) {
    this.resetTextColor();
	var unitWidth = Math.min(80);
	this.drawText('Required Ingredients :', x+50, y, width - unitWidth, 'center');
    this.changeTextColor(this.systemColor());
};

craftingDetailsWindow.prototype.drawComboChance = function(x, y, width) {
	this.resetTextColor();
	var unitWidth = Math.min(80);

	var recipeKeyName = Game_Party.prototype._craftingLearnedRecipes[this.currentItemIndex];
	var recipeDetails = Game_Party.prototype._craftingRecipes[recipeKeyName];
	
	var chance = recipeDetails[1] * 100;

	if(chance>75){
	this.changeTextColor(this.textColor(3))}
	else if(chance > 50){this.changeTextColor(this.textColor(14))}
	else if(chance > 25){this.changeTextColor(this.textColor(20))}
	else {this.changeTextColor(this.textColor(10))};
	
	var unitWidth = Math.min(80);
	this.drawText(chance + ' %', x, y, this.windowWidth() - 32 , 'center');
    this.changeTextColor(this.systemColor());
};

craftingDetailsWindow.prototype.drawDetailsDescription = function(x, y, width) {
    var unitWidth = Math.min(80);
    this.resetTextColor();
	var recipeKeyName = Game_Party.prototype._craftingLearnedRecipes[craftingDetailsWindow.prototype.currentItemIndex];
	var recipeDetails = Game_Party.prototype._craftingRecipes[recipeKeyName];
	var itemNumber = recipeDetails[0];
	var recipe = $dataItems[itemNumber]
	var enabled = Game_Party.prototype.canCombine(recipeKeyName);
	this.changePaintOpacity(enabled);
	this.drawText(recipe.description, x, y, width - 32, 'center');
    this.changeTextColor(this.systemColor());
};

craftingDetailsWindow.prototype.isCurrentItemEnabled = function(){
	var recipeKeyName = Game_Party.prototype._craftingLearnedRecipes[craftingDetailsWindow.prototype.currentItemIndex];
	var enabled = Game_Party.prototype.canCombine(recipeKeyName)
	return enabled;

};

craftingDetailsWindow.prototype.drawDetailsIngredients = function(x, y, width) {
    var unitWidth = Math.min(80);
    this.resetTextColor();
	var inIntialY = y;
	var recipeKeyName = Game_Party.prototype._craftingLearnedRecipes[craftingDetailsWindow.prototype.currentItemIndex];
	var ingredientArray = Game_Party.prototype.ingredients(recipeKeyName);
	var numberOfRequiredIngredients = ingredientArray.length;
	
	var ingredientArrayNames = [];
	var recipe = $dataItems[itemNumber]
	var spacing = 32;
	var haveAllIngredients = 0;
	
		for(i =0;i< numberOfRequiredIngredients;i++){
			var y = inIntialY + spacing*i;
			var itemNumber = ingredientArray[i][0];
			var requiredAmount = ingredientArray[i][1];
			var ingredient = $dataItems[itemNumber];

			ingredientArrayNames.push(ingredient);
			if ($gameParty.numItems(ingredient) >= requiredAmount){
				haveAllIngredients += 1;
				this.resetTextColor();
			}
			else{
			this.changeTextColor(this.hpGaugeColor1())}
			this.drawText($gameParty.numItems(ingredient), x+64, y, width, 'right');
			this.drawIcon(ingredient.iconIndex, this.windowWidth() / 2 - 32 , y);
			this.drawText('/ ' + requiredAmount, x +this.textWidth('0')+64, y, width + this.textWidth('00') , 'right');
			this.drawText(ingredient.name, x +this.textWidth('00'), y, width - unitWidth - 18, 'right');
			};

		this.changeTextColor(this.systemColor());
};

craftingDetailsWindow.prototype.drawItem = function(index){
	var rect = this.itemRectForText(index);
	var recipeKeyName = Game_Party.prototype._craftingLearnedRecipes[craftingDetailsWindow.prototype.currentItemIndex];
	var enabled = Game_Party.prototype.canCombine(recipeKeyName);
    this.resetTextColor();
    this.addCommand("Combine", "Combine", enabled);
	this.drawText(this.commandName(index), rect.x , rect.y, rect.width, 'center')
	this.resetTextColor();
};

craftingDetailsWindow.prototype.processOk = function() {
    craftingDetailsWindow._lastCommandSymbol = this.currentSymbol();
    Window_Command.prototype.processOk.call(this);
};

craftingDetailsWindow.prototype.selectLast = function() {
    this.selectSymbol(craftingDetailsWindow._lastCommandSymbol);
};

function Scene_CraftingMenu() {
    this.initialize.apply(this, arguments);
}
Scene_CraftingMenu.prototype = Object.create(Scene_MenuBase.prototype);
Scene_CraftingMenu.prototype.constructor = Scene_CraftingMenu;

Scene_CraftingMenu.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_CraftingMenu.prototype.update = function() {
	Scene_MenuBase.prototype.update.call(this);
	this.updateDetails();
};

Scene_CraftingMenu.prototype.updateDetails = function(){
	if(this._commandItemWindow.active){
		craftingDetailsWindow.prototype.currentItemIndex = this._commandItemWindow.index();
	};
};

Scene_CraftingMenu.prototype.create = function() {
   Scene_MenuBase.prototype.create.call(this);
   this.createTitleWindow();
   this.createCommandWindow();
   this.createDetailsWindow(); 
};
 
Scene_CraftingMenu.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
};
	
Scene_CraftingMenu.prototype.createCommandWindow = function() {
    var y = craftingTitleWindow.prototype.windowHeight();
    this._commandItemWindow = new craftingListWindow(0, y);
	this._commandItemWindow.setHandler('ok',    	this.commandDetails.bind(this));
	this._commandItemWindow.setHandler('cancel',    this.popScene.bind(this));
	this.addWindow(this._commandItemWindow);
};

Scene_CraftingMenu.prototype.createDetailsWindow = function() {
	var x = craftingListWindow.prototype.windowWidth();
	var y = craftingTitleWindow.prototype.windowHeight();
    this._commandDetailsWindow = new craftingDetailsWindow(x, y);
	this.addWindow(this._commandDetailsWindow );
};

Scene_CraftingMenu.prototype.createTitleWindow = function() {
    this._craftingTitleWindow = new craftingTitleWindow(0, 0);
    this.addWindow(this._craftingTitleWindow);
};

Scene_CraftingMenu.prototype.commandDetails = function() {
	this._commandDetailsWindow.selectLast();
	this._commandItemWindow.deselect();
    this._commandDetailsWindow.activate();
	this._commandDetailsWindow .setHandler('ok',    	this.onDetailsOk.bind(this));
	this._commandDetailsWindow .setHandler('cancel',    this.onDetailsCancel.bind(this));
};

Scene_CraftingMenu.prototype.onDetailsOk = function() {
	var recipeKeyName = Game_Party.prototype._craftingLearnedRecipes[craftingDetailsWindow.prototype.currentItemIndex];
	var ingredientArray = Game_Party.prototype.ingredients(recipeKeyName);
	var numberOfRequiredIngredients = ingredientArray.length;
	var recipeDetails = Game_Party.prototype._craftingRecipes[recipeKeyName];
	var ingredientArrayNames = [];
	var itemNumber = recipeDetails[0];
	var recipe = $dataItems[itemNumber];
	var fail = $dataItems[recipeDetails[2]];
	var enabled = Game_Party.prototype.canCombine(recipeKeyName)
	
	if(enabled){
		for(i =0;i< numberOfRequiredIngredients;i++){
			var itemNumber = ingredientArray[i][0];
			var requiredAmount = ingredientArray[i][1];
			var ingredient = $dataItems[itemNumber];
			$gameParty.loseItem(ingredient, requiredAmount);
		};
	var rng = Math.random();
	var chance = recipeDetails[1];
	if(rng < chance){
	$gameParty.gainItem(recipe, 1);
	}
	else{
	$gameParty.gainItem(fail, 1);
	SoundManager.playBuzzer();
	};
	};
	
	SceneManager.goto(Scene_CraftingMenu);
};

Scene_CraftingMenu.prototype.onDetailsCancel = function() {
	this._commandItemWindow.selectLast();
    this._commandItemWindow.activate();
};

var comboMenuEnabled_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	comboMenuEnabled_pluginCommand.call(this, command, args);
	if (command === "ItemComboMenuEnabled") {
	Game_Party.prototype._CombineMenuEnabled = JSON.parse(args[0]);
	};
};

var itemComboLearn_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	itemComboLearn_pluginCommand.call(this, command, args);
	if (command === "itemComboLearn") {
		var arg = $dataItems[JSON.parse(args[0])].name;
		$gameParty.learnRecipe(arg);
	};
};

var itemComboChance_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	itemComboChance_pluginCommand.call(this, command, args);
	if (command === "itemComboChanceChange") {
		var arg1 = $dataItems[JSON.parse(args[0])].name;
		var arg2 = JSON.parse(args[1]);
		$gameParty.changeItemComboChance(arg1,arg2);
	};
};

var itemComboForget_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	itemComboForget_pluginCommand.call(this, command, args);
	if (command === "itemComboForget") {
		var arg = $dataItems[JSON.parse(args[0])].name;
		$gameParty.forgetRecipe(arg);
	};
};
}());