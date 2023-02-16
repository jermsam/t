
 # shellcheck disable=SC1128
 #!/bin/bash

 DELAY=10
 openssl x509 -in client.pem -inform PEM -subject -nameopt RFC2253
# subject=emailAddress=dev@jitpomi.com,CN=root,OU=Jitpomi-Client,O=JITPOMI,L=PLEASANT GROVE,ST=UTAH,C=US
 # connect to the first node, initialise a replicaset named
 sleep $DELAY | echo Sleeping
#–authenticationDatabase “admin” -u “admin” -p XXXXXXX
#mongosh --tls --host mongo_rs_1 --tlsCertificateKeyFile client.pem --tlsCAFile rs_ca_private.crt --tlsAllowInvalidHostnames
#mongosh --tls --host mongo_rs_1 --tlsCAFile rs_ca_private.crt --tlsCertificateKeyFile mongo_rs_1.pem
 mongosh --tls --host mongo_rs_1 --tlsCertificateKeyFile client.pem --tlsCAFile rs_ca_private.crt --tlsAllowInvalidHostnames <<EOF
 rs.initiate({
   "_id": "mongo_jrs",
   "version": 1,
   "writeConcernMajorityJournalDefault": true,
   "members": [
     { _id : 0, host : "mongo_jr_1:27017" },
     { _id : 1, host : "mongo_jr_2:27017" },
     { _id : 2, host : "mongo_jr_3:27017" },
   ]
 },{ force: true });

use admin;
db.createUser({
  user: "mdb_admin",
  pwd: "mdb_pass",
  roles: [
    {role: "root", db: "admin"},
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "dbAdminAnyDatabase", db: "admin" },
    { role: "readWriteAnyDatabase", db:"admin" },
    { role: "clusterAdmin",  db: "admin" }
  ]
});
EOF

#PATH="$(dirname "$0")":$PATH
#auth_init.sh

