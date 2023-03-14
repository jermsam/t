

 # shellcheck disable=SC1128
 DELAY=5
 sleep $DELAY | echo Sleeping


 mongosh --host localhost --tls  --tlsCertificateKeyFile client.pem --tlsCAFile rs_ca_private.crt --tlsAllowInvalidHostnames <<EOF

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

EOF

#PATH="$(dirname "$0")":$PATH
#auth_init.sh

