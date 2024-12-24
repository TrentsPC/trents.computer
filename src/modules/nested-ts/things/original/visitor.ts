// //visitors
// new Thing("visitor",["visitor body", "visitor psyche"],"visitor");
// new Thing("visitor body",["visitor head", "visitor head,2%", "visitor torso", "visitor arm,99%", "visitor arm,2%", "visitor arm,99%", "visitor leg,99%", "visitor leg,99%", "visitor leg,2%"],"body");
// new Thing("visitor torso",["visitor chest", "visitor pelvis", ".body part"],"torso");
// new Thing("visitor chest",[".body part"],"chest");
// new Thing("visitor pelvis",["visitor naughty bits", ".body part"],"pelvis");
// new Thing("visitor naughty bits",[".soft body part"],["thrusher"]);
// new Thing("visitor arm",["visitor hand", "visitor elbow,2", "visitor armpit", ".body part"],"arm");
// new Thing("visitor hand",["visitor finger,3", ".body part"],"hand");
// new Thing("visitor finger",[".body part"],"finger");
// new Thing("visitor elbow",[".body part"],"elbow");
// new Thing("visitor armpit",["visitor ooze,70%", ".soft body part"],"armpit");
// new Thing("visitor leg",["visitor foot", "visitor knee", ".body part"],"leg");
// new Thing("visitor foot",["toe,4", "visitor ooze,40%", ".body part"],"foot");
// new Thing("visitor toe",[".body part"],"toe");
// new Thing("visitor knee",[".body part"],"knee");
// new Thing("visitor head",["visitor mouth", "eye,0-4", "skull"],"head");
// new Thing("visitor eye",["eye flesh", "visitor ooze,20%"],"eye");
// new Thing("nose",["nostril,2", ".body part"],"nose");
// new Thing("visitor mouth",["visitor teeth", "tongue,2", "visitor ooze"],"mouth");
// new Thing("visitor teeth",["steel"],"teeth");
// new Thing("visitor ooze",["bacteria,40%", "organic matter", "sulfur"],"ooze");

// new Thing("visitor psyche",["visitor thoughts", "visitor memories"],"psyche");
// new Thing("visitor thoughts",["visitor thought,1-3"],"thoughts");
// new Thing("visitor memories",["visitor memory,1-2"],"memories");
// new Thing("visitor thought",[],["ACK!!! ACK ACK ACK", "ACK ACK AAAACK ACK ACK", "ACK, ACKKKKKKKK", "AAAAAAAAAACKKKKKKK", "Ack.", "Ack?", "Ack... Ack ack ack.", "Ack ack ock ack!", "Ack eck.", "Ack ACK AAAAACK", "AACK, ACK ACK ACK!", "AAAAACK ACK ACK ACK", "ACKACKACK, ACK!!!", "Ackack, ackackackack?", "...ack...", "Hehuck.", "Whoack."]);
// new Thing("visitor memory",[],[["Ack ack...", "Ack, ack ack...", "Ack.", "...Ack ack.", "Ack ack ack."], ["", "", " Ack ack ack ack.", " Ack.", " Ack, ack ack.", " Ack ack ack...", " ...ack ack ack.", " ...Ack.", " Ack."]]);

// new Thing("named visitor",[".visitor"],[["B"], ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "!", "?", ";", ",", ".", ":", "/", "*", "#", "¤", "+", "-", "=", " "], ["rt"], ["y", "ie", "ington", "inson", "son", "", "", "", "", "", "", ""]]);

// new Thing("visitor city",["named visitor,0-8", ["space animal,0-3", ""], "visitor neighborhood,1-8"],"visitor city");
// new Thing("visitor neighborhood",["named visitor,0-8", ["space animal,0-3", ""], "visitor building,2-16"],"neighborhood");
// new Thing("visitor building",[["named visitor,0-8", ""], "visitor room,1-8"],[["a tall", "a wide", "a spiralicious", "a twisty", "a holographic", "a composite", "a stout", "a long", "a domed", "an underground", "a submerged", "a gigantic"], [", "], ["green", "blue", "purple", "white", "gray", "translucent", "bright", "porous", "microsthetic", "turbified", "motorized", "hovering", "meshed", "towered", "automated", "ridged"], [" "], ["glumporium", "swapmarket", "slickmarket", "juicehouse", "scienceteria", "faceteria", "homezone", "orbshop", "oozeshop", "marklorion", "hive", "holotekt"]]);
// new Thing("visitor room",["named visitor,60%", "named visitor,30%", "named visitor,10%", "named visitor,10%", "named visitor,10%", "space animal,10%", "visitor furniture,1-6", ".room"],"room");
// new Thing("visitor furniture",["abomination,1%", "space animal,3%", "named visitor,2%", "organic matter,5%", ["glass", "metal", "concrete", "plastic"]],[["symbio", "opto", "auto", "synchro", "thru", "ato", "ecto", "diplo", "plasti", "pasta", "pluta", "elu", "gubri", "capra", "lubio", "logi", "plato", "micro", "alto", "tele", "meta", "anti", "poly", "mono", "corvo"], ["shid", "synth", "shaver", "shist", "mizer", "mucus", "twister", "ridger", "cutter", "mac", "maker", "ctory", "ctamid", "chton", "leaker", "grater", "board", "frame", "table", "stand", "plug", "masher", "greeter", "mobile", "pin", "vat", "tron", "drone", "chron", "tub", "fridge", "pool", "box", "cube", "morpher", "phraser"]]);
// new Thing("visitor installation",["named visitor,0-4", ["space animal,0-3", ""], "visitor building,1-3"],[["pod", "grub", "egg", "limb", "ooze", "tendril", "bulb", "pulp", "energy", "smoke", "hive", "moisture", "cat"], [" "], ["materializer", "synthesizer", "factory", "farm", "collector", "cultures", "pit", "fields", "crops", "barn", "vat"]]);
// new Thing("visitor ship",["named visitor,1-3", "person,20%", "space animal,30%", "visitor furniture,1-6", "metal"],"visitor UFO");
