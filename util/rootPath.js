const path=require("path");

//require.main.filename this will return c/user/soban/desktop/nodjs/server.js
//then path.dirname() remove server.js now we have proejct root
// hamin ya line require.main.filename hamre server file dyte hin tu server file hamshsa proejct
//root ma hute ha tu os ka parent ager ay jaiy wohe hamra proejct root huta ha
module.exports=path.dirname(require.main.filename);

//now where even we neeed procjt root we can import into file