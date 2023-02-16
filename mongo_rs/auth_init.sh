
echo "########### Waiting for mongo_rs_3  ###########"

until mongosh --tls --host mongo_rs_3 --tlsCertificateKeyFile client.pem --tlsCAFile private_ca.pem  --eval 'printjson(db.shutdownServer().ok)'
  do
    echo "########### Sleeping  ###########"
    sleep 10
  done

echo "########### Waiting for mongo_rs_2  ###########"
until mongosh --tls --host mongo_rs_2 --tlsCertificateKeyFile client.pem --tlsCAFile private_ca.pem --eval 'printjson(db.shutdownServer().ok)'
  do
    echo "########### Sleeping  ###########"
    sleep 10
  done

echo "########### Waiting for mongo_rs_1  ###########"
until mongosh --tls --host mongo_rs_1 --tlsCertificateKeyFile client.pem --tlsCAFile private_ca.pem  --eval 'printjson(db.shutdownServer().ok)'
  do
    echo "########### Sleeping  ###########"
    sleep 10
  done

echo "########### Restarting for mongo_rs_1  ###########"
until  mongod --bind_ip 127.0.0.1,172.22.1.13  --replSet my-mongo-set --tlsMode requireTLS --tlsCertificateKeyFile mongo_rs_1.pem --tlsCAFile private_ca.pem --clusterAuthMode x509
  do
    echo "########### Sleeping  ###########"
    sleep 10
  done

echo "########### Restarting for mongo_rs_1  ###########"
until  mongod --bind_ip 127.0.0.1,172.22.1.23  --replSet my-mongo-set --tlsMode requireTLS --tlsCertificateKeyFile mongo_rs_2.pem --tlsCAFile private_ca.pem --clusterAuthMode x509
  do
    echo "########### Sleeping  ###########"
    sleep 10
  done

echo "########### Restarting for mongo_rs_1  ###########"
until  mongod --bind_ip 127.0.0.1,172.22.1.33  --replSet my-mongo-set --tlsMode requireTLS --tlsCertificateKeyFile mongo_rs_3.pem --tlsCAFile private_ca.pem --clusterAuthMode x509
  do
    echo "########### Sleeping  ###########"
    sleep 10
  done

echo "########### All replicas are ready!!!  ###########"


#echo "########### Getting replica set status  ###########"
#
#mongosh --host mongo_rs_1 -ssl --sslPEMKeyFile client.pem --sslCAFile private_ca.pem --username "C=US,ST=UT,L=PLEASANT_GROVE,O=JITPOMI,OU=MONGO_CLIENTS,CN=Jitpomi" --authenticationMechanism "MONGODB-X509" --authenticationDatabase '$external' <<EOF
#
# var config = {
#                _id: "my-mongo-set",
#                members: [
#                { _id : 0, host : "mongo_rs_1:27017" },
#                { _id : 1, host : "mongo_rs_2:27017" },
#                { _id : 2, host : "mongo_rs_3:27017" },
#                ]
#              };
# rs.initiate(config, { force: true });
# rs.status();
#EOF

sleep 10
#
#mongo <<EOF
#   use admin;
#   admin = db.getSiblingDB("admin");
#   admin.createUser(
#     {
#	user: "admin",
#        pwd: "password",
#        roles: [ { role: "root", db: "admin" } ]
#     });
#     db.getSiblingDB("admin").auth("admin", "password");
#     rs.status();
#EOF


mongosh --host mongo_rs_1 --tls --tlsCertificateKeyFile client.pem --tlsCAFile private_ca.pem --username "CN=Jitpomi/OU=MONGO_CLIENTS/O=JITPOMI/L=PLEASANTGROVE/ST=UT/C=US" --authenticationMechanism "MONGODB-X509" --authenticationDatabase '$external' <<EOF

 var config = {
                _id: "my-mongo-set",
                members: [
                { _id : 0, host : "mongo_rs_1:27017" },
                { _id : 1, host : "mongo_rs_2:27017" },
                { _id : 2, host : "mongo_rs_3:27017" },
                ]
              };
 rs.initiate(config, { force: true });
 rs.status();

EOF
