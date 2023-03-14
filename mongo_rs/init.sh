
DELAY=10

 # connect to the first node, initialise a replicaset named
 sleep $DELAY | echo Sleeping

mongosh --host "localhost:27017" <<EOF
(db = (new Mongo("mongo_rs_1:27017")).getDB("test"))
db.getMongo().setReadPref('primary')
 var config = {
                _id: "mongo_rs",
                members: [
                { _id : 0, host : "mongo_rs_1:27017"},
                { _id : 1, host : "mongo_rs_2:27017"},
                { _id : 2, host : "mongo_rs_3:27017"},
                ]
              };
 rs.initiate(config, { force: true });
 rs.status();
 use admin;
 if (db.getUser("rs_admin") == null) {
 db.createUser({
   user: "rs_admin",
   pwd: "rs_pass",
   roles: [
     {role: "root", db: "admin"},
     { role: "userAdminAnyDatabase", db: "admin" },
     { role: "dbAdminAnyDatabase", db: "admin" },
     { role: "readWriteAnyDatabase", db:"admin" },
     { role: "clusterAdmin",  db: "admin" }
   ]
 });

 db.auth('rs_admin', 'rs_pass')
 db.adminCommand( { shutdown: 1 } )
}
EOF


#PATH="$(dirname "$0")":$PATH
#auth_init.sh

