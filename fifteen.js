//js file as a part of submission of homework 6 CICS 516 Fifteen Puzzle
"use strict";

window.onload = OrderTiles;

var TilesDiv;

/**
  * Below function is called when html page loads
*/
function OrderTiles()
{
	var Area = document.getElementById('puzzlearea');
	var SubTiles = Area.getElementsByTagName('div');
	var n = 0;
	var id = 0;
	
	//call to ShuffleTile() method when shufflebutton is clicked
	document.getElementById("shufflebutton").onclick = ShuffleTiles; 
	
	for(var i=0; i<4; i++)
	{
		for(var j=0; j<4; j++)
		{
			SubTiles[n].id = id;
			id++;
			
			SubTiles[n].onmouseover = HoverSquare; // call  function when mouse hovers over a square that can be moved
			SubTiles[n].onNoAction = NoAction; // call function when cursor goes off the tile
			SubTiles[n].onclick = MoveSquare; //call function when we click on the movable square 
			
			//The loop will break when the position for last tile reached
			if(i == 3 && j == 3)
			{
				break;
			}
			
			SubTiles[n].style.backgroundRepeat = "no-repeat";
			SubTiles[n].style.backgroundSize = "400px 400px";
			
			//Get the CSS classname and set the properties of each tile by using javascript.
			SubTiles[n].className = "puzzlepiece";
			
			//Code to set the position of the tiles.
			if(i==0 || j==0) // for first row and column settings.
			{
				SubTiles[n].style.top = "0px";
				SubTiles[n].style.left = "0px";
				
				if(i==0 && j==0) // row 0 and column 0
				{
					SubTiles[n].style.backgroundPosition = '0px 0px';
					n++;
					continue;
				}
				else if(i==0 && j!=0) // row 0 and column other than 0
				{
					SubTiles[n].style.left = j * 100 + "px";
					SubTiles[n].style.backgroundPosition = ((-j)*100)+ 'px 0px';
				}
				else if(i!=0 && j==0) // row other then 0 and column value 0
				{
					SubTiles[n].style.top = i * 100 + "px";
					SubTiles[n].style.backgroundPosition = '0px '+((-i)*100)+ 'px';
				}
			}
			else // for other values of rows and columns.
			{
				SubTiles[n].style.top = i * 100 + "px";
				SubTiles[n].style.left = j * 100 + "px";
				SubTiles[n].style.backgroundPosition = ((-j)*100)+ 'px '+((-i)*100)+ 'px';
			}
			n++;
		}	
	}
}
/**
 * Below function is executed when shuffle button is pressed.
*/
function ShuffleTiles()
{
	if(document.getElementById('EmptySpace') === null) // create new space for the tile.
	{
		CreateTile();
	}
		
	var Index = 0;  
	var count = 0; // variable to store the shuffle count

	// code to shuffle the tiles . we can shuffle upto 100 times .
	while(count <= 100)
	{
		//check the new tile.
		var TileLeft = document.getElementById('EmptySpace').style.left;
		var TileTop = document.getElementById('EmptySpace').style.top;
	
		//array will store the neighbours of the new tile so that we choose any one among them to swap the position
		var AdjacentTile = [];
		var NewSpaceValue = document.getElementById('EmptySpace').value;
	   //variables used to do positioning.
		var CheckLeft;
		var CheckRight;
		var CheckTop;
		var CheckDown;
		var Left_id = parseInt(NewSpaceValue)-1;
		var Right_id = parseInt(NewSpaceValue)+1;
		var Top_id = parseInt(NewSpaceValue)-4;
		var Down_id = parseInt(NewSpaceValue)+4;
	
		//To get the neighbours distance from the movable div 
		if(Top_id>=0 && Top_id<=15){
			CheckTop = (document.getElementById(Top_id).style.top);
		}
		
		if(Left_id>=0 && Left_id<=15){
			CheckLeft = (document.getElementById(Left_id).style.left);
		}
		
		if(Right_id>=0 && Right_id<=15){
			CheckRight = (document.getElementById(Right_id).style.left);
		}
		
		if(Down_id>=0 && Down_id<=15){
			CheckDown = (document.getElementById(Down_id).style.top);
		}
		
		//code thoroughly rearrange the tiles as well as the position of the blank square.
		
		if (parseInt(NewSpaceValue)==0 || parseInt(NewSpaceValue)==1 || parseInt(NewSpaceValue)==2 || parseInt(NewSpaceValue)==3){
			CheckTop = undefined;
		}
		if (parseInt(NewSpaceValue)==4 || parseInt(NewSpaceValue)==8 || parseInt(NewSpaceValue)==12 || parseInt(NewSpaceValue)==0){
			CheckLeft = undefined;
		}
		if (parseInt(NewSpaceValue)==3 || parseInt(NewSpaceValue)==7 || parseInt(NewSpaceValue)==11 || parseInt(NewSpaceValue)==15){
			CheckRight = undefined;
		}
		if (parseInt(NewSpaceValue)==12 || parseInt(NewSpaceValue)==13 || parseInt(NewSpaceValue)==14 || parseInt(NewSpaceValue)==15){
			CheckDown = undefined;
		}
		
		//Code to push the new tile space to the neighbour
		if(CheckTop){
			AdjacentTile.push(Top_id);
		}
		if(CheckLeft){
			AdjacentTile.push(Left_id);
		}
		if(CheckRight){
			AdjacentTile.push(Right_id);
		}
		if(CheckDown){
			AdjacentTile.push(Down_id);
		}
		
		//to select the random adjacent tile
		
		var Num = RandomFunction(AdjacentTile.length, Index);
		var NewPosition = document.getElementById('EmptySpace').value;
		var CurrPosition = AdjacentTile[parseInt(Num)-1];
		document.getElementById('EmptySpace').value = CurrPosition;
		document.getElementById(CurrPosition).setAttribute('id', NewPosition);
		
		ChangePosition('EmptySpace', NewPosition); // call helper function to reposition .
		
		AdjacentTile.length = 0;
		Index = Num;
		count++;
	}
}
/**
 * Below is the helper function to create the EmptySpace div 
*/
function CreateTile()
{
	var NewTile = document.createElement('div');
	NewTile.id = 'EmptySpace';
	document.getElementById('puzzlearea').appendChild(NewTile);
	document.getElementById('EmptySpace').value = "15"; // assign value 15 to new div created.
	document.getElementById('EmptySpace').style.left = "300px"; 
	document.getElementById('EmptySpace').style.top = "300px";
}

/**
 * Below is the helper function to generate random number in given range
*/
function RandomFunction(x, y)
{
	var randomnumber = Math.floor((Math.random() * parseInt(x)) + 1);
	while(true){
		randomnumber = Math.floor((Math.random() * parseInt(x)) + 1);
		if(y != randomnumber){
			break;
		}
	}
	return randomnumber;
}

/**
 * Below function is called when the mouse hovers over a square that can be moved.
*/
function HoverSquare()
{
	//variable to store the coordinates of the EmptySpace div
	var TileLeft = document.getElementById('EmptySpace').style.left;
	var TileTop = document.getElementById('EmptySpace').style.top;
	
	//variable to store the coordinate of the tile that can be moved
	var ShiftLeft = document.getElementById(this.id).style.left; 
	var ShiftTop = document.getElementById(this.id).style.top;	
	
	//To check whether the movable tile exists in left of EmptySpace div
	if((parseInt(ShiftLeft) == parseInt(parseInt(TileLeft) - 100)) && (parseInt(ShiftTop) == parseInt(TileTop))){
		document.getElementById(this.id).className += " movablepiece";
	}
	//To check whether the movable tile exists in right of EmptySpace div
	if((parseInt(ShiftLeft) == parseInt(parseInt(TileLeft) + 100)) && (parseInt(ShiftTop) == parseInt(TileTop))){
		document.getElementById(this.id).className += " movablepiece";
	}
	//To check whether the movable tile exists at top of EmptySpace div
	if((parseInt(ShiftTop) == parseInt(parseInt(TileTop) - 100)) && (parseInt(ShiftLeft) == parseInt(TileLeft))){
		document.getElementById(this.id).className += " movablepiece";
	}
	//To check whether the movable tile exists at bottom of EmptySpace div
	if((parseInt(ShiftTop) == parseInt(parseInt(TileTop) + 100)) && (parseInt(ShiftLeft) == parseInt(TileLeft))){
		document.getElementById(this.id).className += " movablepiece";
	}
}

/**
 * Below function is to check if that square is next to the blank square, it is moved into the blank space.
 */
function MoveSquare()
{
	if(document.getElementById('EmptySpace') === null){
		alert("Press The Shuffle Button To Start The Game !!! ");
	}
	//variable to get the position of 'EmptySpace' div
	var TileLeft = document.getElementById('EmptySpace').style.left;
	var TileTop = document.getElementById('EmptySpace').style.top;
	
	//variable to store the coordinates of the clicked tile 
	var ShiftLeft = document.getElementById(this.id).style.left; 
	var ShiftTop = document.getElementById(this.id).style.top;	
	
	//To check whether the movable tile exists in left of EmptySpace div
	if((parseInt(ShiftLeft) == parseInt(parseInt(TileLeft) - 100)) && (parseInt(ShiftTop) == parseInt(TileTop))){
		document.getElementById('EmptySpace').value = this.id;
		this.id = parseInt(this.id)+1;
		TilesDiv = this.id;
		ChangePosition('EmptySpace', TilesDiv);
	}
	
	//To check whether the movable tile exists in right of EmptySpace div
	if((parseInt(ShiftLeft) == parseInt(parseInt(TileLeft) + 100)) && (parseInt(ShiftTop) == parseInt(TileTop))){
		document.getElementById('EmptySpace').value = this.id;
		this.id = parseInt(this.id)-1;
		TilesDiv = this.id;
		ChangePosition('EmptySpace', TilesDiv);
	}
	
	//To check whether the movable tile exists at top of EmptySpace div
	if((parseInt(ShiftTop) == parseInt(parseInt(TileTop) - 100)) && (parseInt(ShiftLeft) == parseInt(TileLeft))){
		document.getElementById('EmptySpace').value = this.id;
		this.id = parseInt(this.id)+4;
		TilesDiv = this.id;
		ChangePosition('EmptySpace', TilesDiv);
	}
	
	//To check whether the movable tile exists at bottom of EmptySpace div
	if((parseInt(ShiftTop) == parseInt(parseInt(TileTop) + 100)) && (parseInt(ShiftLeft) == parseInt(TileLeft))){
		document.getElementById('EmptySpace').value = this.id; //space exists in right
		this.id = parseInt(this.id)-4;
		TilesDiv = this.id;
		ChangePosition('EmptySpace', TilesDiv);
	}
}
/**
 * below helper function is to interchange the position of two elements.
*/
function ChangePosition(id1, id2)
{
	var TileLeft = document.getElementById(id1).style.left;
	var ShiftLeft = document.getElementById(id2).style.left; 
	document.getElementById(id1).style.left = ShiftLeft;
	document.getElementById(id2).style.left = TileLeft;
	
	var TileTop = document.getElementById(id1).style.top;
	var ShiftTop = document.getElementById(id2).style.top;	
	document.getElementById(id1).style.top = ShiftTop;
	document.getElementById(id2).style.top = TileTop;

}	
/**
 * Below function is called when does not neighbor the blank square or 
 * if the mouse is pressed on the empty square or elsewhere on the page, no action occurs.
*/
function NoAction()
{
	this.className = this.className.replace("movablepiece", '');
}
