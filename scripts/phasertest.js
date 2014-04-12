
var textGroup;
window.onload = function() {

var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });


var money = 0;
var moneyText;
var cursors;
var stars;
var everythingElseGroup;
var libraryHackButton;
var libraryFlavorText;
var libCompUpgradeButton;
var differentAccountTypes = ["Facebook", "Email", "Amazon", "Bank"];

var libHackingLevel = 1;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



function preload() {
    //sk
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/person.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('pixel', 'assets/pixel.png');

	game.load.image('button', 'assets/hackbutton.png');
	game.load.image('library', 'assets/library.png');
    game.load.image('coffee', 'assets/starbucks.png');
    game.load.image('hotel', 'assets/hotel.png');
    game.load.image('airport', 'assets/airport.png');
    game.load.image('fox', 'assets/fox.png');
    game.load.image('upgrade', 'assets/upgrade.png');
    

	game.stage.backgroundColor = 0x02b2ff;
}

function create() {
    //sk
    game.physics.startSystem(Phaser.Physics.ARCADE);
    platforms = game.add.group();
    platforms.enableBody = true;

    var ledge = platforms.create(0, 400, 'ground');
    ledge.scale.setTo((1280/400), 1);
    ledge.body.immovable = true;



    game.world.setBounds(0, 0, 1280, 720);
    var style = { font: "30px Arial", fill: "#ffff44", align: "center" };

    textGroup = game.add.group();
    everythingElseGroup = game.add.group();
    //text.parent = null;

    var t = game.add.text(300, 0, "Hack the users as they use your compromised computers\nto steal their accounts giving you more funds!", style, textGroup);
    t.fixedToCamera = true;
    var lib = game.add.image(100, 450, 'library');
    everythingElseGroup.add(lib);
    
    var coffee = game.add.image(740, 480, 'coffee'); 
    coffee.scale.setTo(.7,.7);
    everythingElseGroup.add(coffee);
    
    var hotel = game.add.image(200, 200, 'hotel'); 
    hotel.scale.setTo(.5,.5);
    everythingElseGroup.add(hotel);
    
    var airport = game.add.image(930, 80, 'airport'); 
    airport.scale.setTo(.8,.7);
    everythingElseGroup.add(airport);
    
    var fox = game.add.image(1080, 523, 'fox'); 
    fox.scale.setTo(.25,.25);
    everythingElseGroup.add(fox);
    


    var libText = game.add.text(100 + 140, 600, "Shady Computer", {font: "20px Arial", align: "center"});
    everythingElseGroup.add(libText);
    moneyText = game.add.text(740 + 450, 0, "$0", style);
    moneyText.fixedToCamera = true;

    libraryHackButton = game.add.button(0, 500, 'button', buttonClick, this);
    everythingElseGroup.add(libraryHackButton);
    libraryFlavorText = game.add.text(libraryHackButton.x + 50, libraryHackButton.y + 200, "Facebook account stolen!");
    everythingElseGroup.add(libraryFlavorText);
    libraryFlavorText.visible = false;
    

    libCompUpgradeButton = game.add.button(0, 0, 'upgrade', buttonClick, this);
    everythingElseGroup.add(libCompUpgradeButton);
    
    
    everythingElseGroup.add(ledge);

    libraryHackButton.alpha = 0;
    libraryHackButton.clickable = false;
    libraryHackButton.nextVisible = -1;
    cursors = game.input.keyboard.createCursorKeys();
    
    stars = game.add.group();
    stars.enableBody = true;

    for (var i = 0; i < 400; i++){
        var star = stars.create(i * (1280/400) + getRandomInt(1,9), 395+getRandomInt(-15,15), 'star');
        star.scale.setTo(.50,.50)
        star.body.velocity.x = 100+getRandomInt(1,10);
        star.state = "right";
        star.mode = "none";
        star.bringToTop();
    }
    everythingElseGroup.scale.x = everythingElseGroup.scale.y = .9;
    stars.scale.x = stars.scale.y = .9;   
}

function buttonClick() {
    if (libraryHackButton.clickable){
        var accType = getRandomInt(1, 10);
        var value;

        if (accType < 8) {
            libraryFlavorText.text = differentAccountTypes[0];
            value = getRandomInt(1, 20);
        } else {
            libraryFlavorText.text = differentAccountTypes[1];
            value = getRandomInt(30, 100);
        }

        libraryFlavorText.text += " account stolen! $" + value + " added to your account.";
        money += value;
        moneyText.text = "$" + money;
        libraryHackButton.alpha = 0;
        libraryHackButton.nextVisible = 100;
        libraryHackButton.clickable = false;
        libraryHackButton.visible = false;
        libraryFlavorText.visible = true;
	}
}

function update() {
	if (libraryHackButton.nextVisible >= 60){
		libraryHackButton.nextVisible--;
	} else if (libraryHackButton.nextVisible < 60 && libraryHackButton.nextVisible > 0) {
		libraryHackButton.alpha -= 1/60;
		libraryHackButton.nextVisible--;
	} else if (libraryHackButton.nextVisible === 0) {
		libraryHackButton.alpha = 0;
		libraryHackButton.clickable = false;
		libraryFlavorText.visible = false;
		libraryHackButton.nextVisible--;
	}

	//handle moving camera with arrow keys
	if (cursors.up.isDown)
    {
        //game.camera.y -= 4;
        //game.world.scale.x -= .01;
        //game.world.scale.y -= .01;
        everythingElseGroup.scale.x -= .01;
        everythingElseGroup.scale.y -= .01;
        stars.scale.x -= .01;
        stars.scale.y -= .01;

    }
    else if (cursors.down.isDown)
    {
		//game.camera.y += 4;
		everythingElseGroup.scale.x += .01;
        everythingElseGroup.scale.y += .01;
        stars.scale.x += .01;
        stars.scale.y += .01;
        
    }

    if (cursors.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 4;
    }

    //sk
    for(var i=0; i<stars.children.length; i++){
        checkLibrary(stars.children[i]);
        checkCoffee(stars.children[i]);
        checkHotel(stars.children[i]);
        checkAirport(stars.children[i]);
        checkKillStar(stars.children[i]);
    }

}

function checkLibrary(star){
    if(Math.abs(star.x - 175) < 5 && star.state ==="right"){
        if(getRandomInt(0,1000) > 990){
            star.x = 175+getRandomInt(-5,5);
            star.body.velocity.x = 0;
            star.body.velocity.y = 50;
            star.state = "downLib";
        }
    }
    if(star.y >= 500 && star.state == "downLib"){
        star.body.velocity.y = 0;
        star.state = "stopLib";
        star.tickCount = 0;
        console.log(libraryHackButton.nextVisible);
        if (libraryHackButton.nextVisible === -1 && getRandomInt(1, 5) == 1){
        	libraryHackButton.nextVisible = 200;
        	libraryHackButton.alpha = 1;
        	libraryHackButton.visible = true;
        	libraryHackButton.clickable = true;
        	libraryFlavorText.text = "User login detected!";
        	libraryFlavorText.visible = true;
        }

    }
    if(star.state=="stopLib"){
        if(star.tickCount > 200){
            star.body.velocity.y = -50;
            star.state = "upLib";
        }
        star.tickCount++;
    }
    if(star.y <= 400 && star.state=="upLib"){
        star.state="right";
        star.body.velocity.x = 100+getRandomInt(1,10);
        star.body.velocity.y = 0;
        star.y = 395+getRandomInt(-15,15);
    }
}


function checkCoffee(star){
    if(Math.abs(star.x - 800) < 3 && star.state === "right"){
        if(getRandomInt(0,1000) > 500){
            star.x += getRandomInt(-5,5);
            star.body.velocity.x = 0;
            star.body.velocity.y = 100;
            star.state = "downCoff";
        }
    }
    if(star.y >= 500 && star.state == "downCoff"){
        star.body.velocity.y = 0;
        star.state = "stopCoff";
        star.tickCount = 0;
    }
    if(star.state=="stopCoff"){
        if(star.tickCount > 300){
            star.body.velocity.y = -200;
            star.state = "upCoff";
        }
        star.tickCount++;
    }
    if(star.y <= 400 && star.state=="upCoff"){
        star.state="right";
        star.body.velocity.x = 100+getRandomInt(1,10);
        star.body.velocity.y = 0;
        star.y = 395+getRandomInt(-15,15);
    }
}

function checkHotel(star){
    if(Math.abs(star.x - 300) < 2 && star.state === "right"){
        if(getRandomInt(0,1000) > 800){
            star.x += getRandomInt(-5,5);
            star.body.velocity.x = 0;
            star.body.velocity.y = -45;
            star.state = "upHot";
        }
    }
    if(star.y <= 300 && star.state == "upHot"){
        star.body.velocity.y = 0;
        star.state = "stopHot";
        star.tickCount = 0;
    }
    if(star.state=="stopHot"){
        if(star.tickCount > 500){
            star.body.velocity.y = 45;
            star.state = "downHot";
        }
        star.tickCount++;
    }
    if(star.y >= 400 && star.state=="downHot"){
        star.state="right";
        star.body.velocity.x = 100+getRandomInt(1,10);
        star.body.velocity.y = 0;
        star.y = 395+getRandomInt(-15,15);
    }
}

function checkAirport(star){
    if(Math.abs(star.x - 1000) < 3 && star.state == "right"){
        if(getRandomInt(0,1000) > 750){
            star.x += getRandomInt(-5,5);
            star.body.velocity.x = 0;
            star.body.velocity.y = -300;
            star.state = "upAir";
        }
    }
    if(star.y <= 220 && star.state == "upAir"){
        star.body.velocity.y = 0;
        star.state = "stopAir";
        star.tickCount = 0;
    }
    if(star.state=="stopAir"){
        if(star.tickCount > 220){
            star.body.velocity.y = 140;
            star.state = "downAir";
        }
        star.tickCount++;
    }
    if(star.y >= 400 && star.state=="downAir"){
        star.state="right";
        star.body.velocity.x = 100+getRandomInt(1,10);
        star.body.velocity.y = 0;
        star.y = 395+getRandomInt(-15,15);
    }
}

function checkKillStar (star) {
    if(star.x > 1280-30){
        star.x = 20+getRandomInt(1,9);
        star.body.velocity.x = 100;
    }
}


function purchaseLibCompUpgrade(){
    if(money < 100*libHackingLevel){
        money -= 100*libHackingLevel;
        libHackingLevel += 1;
    }
}

};