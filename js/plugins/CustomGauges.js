//=============================================================================
// CustomGauges.js
//=============================================================================

/*:
 * @plugindesc Changes how gauges are displayed
 * @author Rocketmancer
 *
 * @param barType
 * @desc Type of bar to use. 0: Normal 1: Slanted 2: Pointed 3: Round
 * @default 0
 *
 * @param outline
 * @desc Outline bars? 0: No 1: Yes
 * @default 0
 *
 * @param outlineColor1
 * @desc First color for outline gradient in Hex
 * @default #FFFFFF
 *
 * @param outlineColor2
 * @desc Second color for outline gradient in Hex
 * @default #FFFFFF
 *
 */


(function() {
	var parameters = PluginManager.parameters('CustomGauges');
	var barType = Number(parameters['barType'] || 0);
	var outline = Number(parameters['outline'] || 0);
	var outlineColor1 = String(parameters['outlineColor1']);
	var outlineColor2 = String(parameters['outlineColor2']);

	Bitmap.prototype.fillTrap1 = function(x, y, width, widthpart, height, color1, color2) {
		var context = this._context;
		var grad = context.createLinearGradient(x, y, x + width, y);
		grad.addColorStop(0, color1);
		grad.addColorStop(1, color2);
		context.save();
		context.beginPath();
		context.moveTo(x + height, y)
		context.lineTo(x + width, y)
		context.lineTo(x + width - height, y + height)
		context.lineTo(x, y + height)
		context.clip();
		context.fillStyle = grad;
		context.fillRect(x, y, widthpart, height);
		context.restore();
		this._setDirty();
	}
	
	Bitmap.prototype.fillTrap2 = function(x, y, width, widthpart, height, color1, color2) {
		var context = this._context;
		var grad = context.createLinearGradient(x, y, x + width, y);
		grad.addColorStop(0, color1);
		grad.addColorStop(1, color2);
		
		context.save();
		context.fillStyle = grad;
		context.beginPath();
		context.moveTo(x + height/2, y)
		context.lineTo(x + width - height/2, y)
		context.lineTo(x + width, y + height/2)
		context.lineTo(x + width - height/2, y + height)
		context.lineTo(x + height/2, y + height)
		context.lineTo(x, y + height/2)
		context.clip();
		context.fillStyle = grad;
		context.fillRect(x, y, widthpart, height);
		context.restore();
		this._setDirty();
	}

	Bitmap.prototype.fillTrap3 = function(x, y, width, widthpart, height, color1, color2) {
		var context = this._context;
		var grad = context.createLinearGradient(x, y, x + width, y);
		grad.addColorStop(0, color1);
		grad.addColorStop(1, color2);
		
		context.save();
		context.fillStyle = grad;
		context.beginPath();
		context.moveTo(x + height, y)
		context.lineTo(x + width - height, y);
		context.bezierCurveTo(x + width, y, x + width, y + height, x + width - height, y + height);
		context.lineTo(x + height, y + height);
		context.bezierCurveTo(x, y + height, x, y, x + height, y);
		context.clip();
		context.fillStyle = grad;
		context.fillRect(x, y, widthpart, height);
		context.restore();
		this._setDirty();
	}
	
	
	
	Bitmap.prototype.outlineRect = function(x, y, width, height, color1, color2) {
		var context = this._context;
		var grad = context.createLinearGradient(x, y, x + width, y);
		grad.addColorStop(0, color1);
		grad.addColorStop(1, color2);
		context.save();
		context.strokeStyle = grad;
		context.beginPath();
		context.moveTo(x, y)
		context.lineTo(x + width, y)
		context.lineTo(x + width, y + height)
		context.lineTo(x, y + height)
		context.lineTo(x, y)
		context.stroke();
		context.restore();
		this._setDirty();
	}
	
	Bitmap.prototype.outlineTrap1 = function(x, y, width, height, color1, color2) {
		var context = this._context;
		var grad = context.createLinearGradient(x, y, x + width, y);
		grad.addColorStop(0, color1);
		grad.addColorStop(1, color2);
		context.save();
		context.strokeStyle = grad;
		context.beginPath();
		context.moveTo(x + height, y)
		context.lineTo(x + width, y)
		context.lineTo(x + width - height, y + height)
		context.lineTo(x, y + height)
		context.lineTo(x + height, y)
		context.stroke();
		context.restore();
		this._setDirty();
	}
	
	Bitmap.prototype.outlineTrap2 = function(x, y, width, height, color1, color2) {
		var context = this._context;
		var grad = context.createLinearGradient(x, y, x + width, y);
		grad.addColorStop(0, color1);
		grad.addColorStop(1, color2);
		
		context.save();
		context.strokeStyle = grad;
		context.beginPath();
		context.moveTo(x + height/2, y)
		context.lineTo(x + width - height/2, y)
		context.lineTo(x + width, y + height/2)
		context.lineTo(x + width - height/2, y + height)
		context.lineTo(x + height/2, y + height)
		context.lineTo(x, y + height/2)
		context.lineTo(x + height/2, y)
		context.stroke();
		context.restore();
		this._setDirty();
	}

	Bitmap.prototype.outlineTrap3 = function(x, y, width, height, color1, color2) {
		var context = this._context;
		var grad = context.createLinearGradient(x, y, x + width, y);
		grad.addColorStop(0, color1);
		grad.addColorStop(1, color2);
		
		context.save();
		context.strokeStyle = grad;
		context.beginPath();
		context.moveTo(x + height, y)
		context.lineTo(x + width - height, y);
		context.bezierCurveTo(x + width, y, x + width, y + height, x + width - height, y + height);
		context.lineTo(x + height, y + height);
		context.bezierCurveTo(x, y + height, x, y, x + height, y);
		context.stroke();
		context.restore();
		this._setDirty();
	}
	
	
	Window_Base.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
		var fillW = Math.floor(width * rate);
		var gaugeY = y + this.lineHeight() - 10;
		switch (barType) {
			case 0:
				// Default display type
				this.contents.fillRect(x, gaugeY, width, 8, this.gaugeBackColor());
				this.contents.gradientFillRect(x, gaugeY, fillW, 8, color1, color2);
				if (outline) { this.contents.outlineRect(x, gaugeY, width, 8, outlineColor1, outlineColor2)}
			break;
			case 1:
				// Slanted to the right
				this.contents.fillTrap1(x, gaugeY, width, width, 8, this.gaugeBackColor(),  this.gaugeBackColor());
				this.contents.fillTrap1(x, gaugeY, width, fillW, 8, color1, color2);
				if (outline) { this.contents.outlineTrap1(x, gaugeY, width, 8, outlineColor1, outlineColor2)}
			break;
			case 2:
				// Pointy Ends
				this.contents.fillTrap2(x, gaugeY, width, width, 8, this.gaugeBackColor(),  this.gaugeBackColor());
				this.contents.fillTrap2(x, gaugeY, width, fillW, 8, color1, color2);
				if (outline) { this.contents.outlineTrap2(x, gaugeY, width, 8, outlineColor1, outlineColor2)}
			break;
			case 3:
				// Round ends
				this.contents.fillTrap3(x, gaugeY, width, width, 8, this.gaugeBackColor(),  this.gaugeBackColor());
				this.contents.fillTrap3(x, gaugeY, width, fillW, 8, color1, color2);
				if (outline) { this.contents.outlineTrap3(x, gaugeY, width, 8, outlineColor1, outlineColor2)}
			break;
		}
		
	};
	
})();
