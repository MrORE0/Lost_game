(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("room1",
{ "compressionlevel":-1,
 "height":25,
 "infinite":false,
 "layers":[
        {
         "data":[182, 186, 186, 117, 99, 117, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 118, 184, 185, 107,
            198, 153, 153, 153, 153, 143, 1610612841, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 2684354665, 153, 153, 153, 203,
            182, 153, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 2684354665, 153, 231, 153, 219,
            198, 153, 1610612841, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 2684354665, 153, 153, 153, 235,
            214, 153, 1610612841, 153, 2684354665, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 153, 153, 153, 153, 153, 153, 153, 153, 153, 2684354665, 153, 153, 153, 203,
            230, 153, 1610612841, 153, 2684354665, 148, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 3221225720, 3221225720, 3221225720, 3221225720, 2684354665, 3221225720, 3221225720, 153, 219,
            182, 153, 1610612841, 153, 2684354665, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 2684354665, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 2684354665, 153, 235,
            198, 153, 1610612841, 153, 2684354665, 153, 153, 153, 153, 153, 2684354665, 153, 153, 153, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 153, 153, 153, 2684354665, 127, 203,
            214, 153, 1610612841, 153, 2684354665, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 2684354665, 153, 219,
            230, 153, 1610612841, 153, 2684354665, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 2684354665, 153, 235,
            182, 153, 1610612841, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 2684354665, 153, 153, 153, 153, 203,
            198, 153, 1610612841, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 2684354665, 153, 153, 153, 153, 219,
            214, 153, 1610612841, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 2684354665, 153, 153, 153, 153, 235,
            230, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 2684354665, 153, 153, 153, 153, 203,
            182, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 2684354665, 153, 153, 153, 153, 219,
            198, 153, 153, 3221225720, 3221225720, 3221225720, 3221225720, 153, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 235,
            214, 153, 153, 1610612841, 126, 153, 2684354665, 153, 153, 153, 153, 153, 153, 2684354665, 1073742034, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 219,
            230, 153, 153, 1610612841, 153, 153, 2684354665, 153, 153, 153, 153, 153, 153, 2684354665, 153, 153, 153, 143, 153, 153, 153, 153, 153, 153, 235,
            182, 153, 153, 1610612841, 153, 153, 2684354665, 153, 153, 153, 153, 153, 153, 2684354665, 153, 153, 153, 153, 153, 3221225720, 3221225720, 3221225720, 3221225720, 3221225720, 219,
            198, 153, 153, 1610612841, 153, 153, 2684354665, 153, 153, 153, 153, 153, 153, 2684354665, 153, 153, 153, 153, 153, 2684354665, 153, 153, 2684354665, 153, 235,
            214, 153, 153, 1610612841, 153, 153, 2684354665, 153, 153, 153, 153, 153, 153, 2684354665, 153, 153, 153, 153, 153, 2684354665, 153, 153, 2684354665, 153, 187,
            182, 153, 153, 1610612841, 153, 153, 2684354665, 153, 153, 153, 153, 153, 153, 2684354665, 153, 153, 153, 153, 153, 2684354665, 153, 153, 2684354665, 153, 203,
            198, 153, 231, 1610612841, 153, 153, 2684354665, 153, 148, 3221225720, 3221225720, 3221225720, 3221225720, 2684354665, 153, 153, 153, 153, 153, 2684354665, 153, 153, 2684354665, 153, 219,
            230, 211, 153, 1610612841, 153, 153, 153, 153, 153, 153, 153, 153, 143, 2684354665, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 235,
            246, 247, 248, 249, 250, 247, 248, 249, 250, 247, 248, 249, 250, 247, 248, 249, 250, 247, 248, 249, 247, 248, 249, 250, 251],
         "height":25,
         "id":1,
         "name":"background",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":25,
         "x":0,
         "y":0
        }],
 "nextlayerid":4,
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.10.2",
 "tileheight":32,
 "tilesets":[
        {
         "firstgid":1,
         "source":"..\/..\/..\/..\/..\/Dungeon_Tileset_at.tsx"
        }],
 "tilewidth":32,
 "type":"map",
 "version":"1.10",
 "width":25
});