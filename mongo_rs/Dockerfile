
FROM mongo as make_ca_keys
# Generate a new private key using openssl
# RUN openssl genrsa -des3 -passout pass:password -out rs_ca_private.key 2048
RUN openssl genrsa -passout pass:password -out rs_ca_private.key -aes256 8192
# Sign a new CA certificate
#RUN openssl req -new -x509 -nodes -sha256 -days 1825 -key rs_ca_private.key -passin pass:password -out rs_private_ca.pem -subj "/CN=CA/OU=MONGO/O=JITPOMI/L=PLEASANTGROVE/ST=UT/C=US"
RUN openssl req -passin pass:password -x509 -new -extensions v3_ca -key rs_ca_private.key -days 365 -out rs_ca_private.crt -subj "/C=US/ST=UTAH/L=PLEASANT GROVE/O=JITPOMI/OU=DEV/CN=dev@jitpomi.com"

# RUN openssl req -passout pass:password -new -x509 -days 1825 -extensions v3_ca -keyout rs_private_ca.pem -out private_ca.pem -subj "/CN=CA/OU=MONGO/O=JITPOMI/L=PLEASANTGROVE/ST=UT/C=US"

FROM mongo as mongo_rs_1_image
#COPY --from=make_ca_keys ./rs_private_ca.pem .
#COPY --from=make_ca_keys ./private_ca.pem ..
#RUN ["chmod", "+x", "rs_private_ca.pem"]
#RUN ["chmod", "+x", "private_ca.pem"]

COPY mongo_rs_1.cnf .
#Issue self-signed certificates for all nodes
#RUN openssl req -newkey rsa:4096 -nodes -out mongo_rs_1.csr -keyout mongo_rs_1.key -subj '/CN=172.22.1.13/OU=MONGO/O=JITPOMI/L=PLEASANTGROVE/ST=UT/C=US'
#RUN openssl x509 -passin pass:password -sha256 -req -days 1825 -in mongo_rs_1.csr -CA private_ca.pem -CAkey rs_private_ca.pem -CAcreateserial -out mongo_rs_1-signed.crt -extensions v3_req -extfile mongo_rs_1.cnf
#RUN cat mongo_rs_1-signed.crt mongo_rs_1.key > mongo_rs_1.pem
# scp node1.pem private_ca.pem client.pem root@X.X.X.X:/root


COPY --from=make_ca_keys ./rs_ca_private.key .
COPY --from=make_ca_keys ./rs_ca_private.crt .
RUN ["chmod", "+x", "rs_ca_private.key"]
RUN ["chmod", "+x", "rs_ca_private.crt"]
# generate a certificate request
RUN openssl req -nodes -newkey rsa:4096 -sha256 -keyout mongo_rs_1.key -out mongo_rs_1.csr -subj '/C=US/ST=UTAH/L=PLEASANT GROVE/O=JITPOMI/OU=DEV/CN=172.22.1.13'
#  sign it using the CA certificate
RUN openssl x509 -passin pass:password -CA rs_ca_private.crt -CAkey rs_ca_private.key -CAcreateserial -req -days 365 -in mongo_rs_1.csr -out mongo_rs_1.crt -extensions v3_req -extfile mongo_rs_1.cnf

RUN cat mongo_rs_1.key mongo_rs_1.crt > mongo_rs_1.pem

FROM mongo as mongo_rs_2_image
#COPY --from=make_ca_keys ./rs_private_ca.pem .
#COPY --from=make_ca_keys ./private_ca.pem .
#RUN ["chmod", "+x", "rs_private_ca.pem"]
#RUN ["chmod", "+x", "private_ca.pem"]

COPY mongo_rs_2.cnf .
#RUN openssl req -newkey rsa:4096 -nodes -out mongo_rs_2.csr -keyout mongo_rs_2.key -subj  '/CN=172.22.1.23/OU=MONGO/O=JITPOMI/L=PLEASANTGROVE/ST=UT/C=US'
#RUN openssl x509 -passin pass:password -sha256 -req -days 1825 -in mongo_rs_2.csr -CA private_ca.pem -CAkey rs_private_ca.pem -CAcreateserial -out mongo_rs_2-signed.crt -extensions v3_req -extfile mongo_rs_2.cnf
#RUN cat mongo_rs_2-signed.crt mongo_rs_2.key > mongo_rs_2.pem
#scp mongo_rs_2.pem private_ca.pem root@Y.Y.Y.Y:/root

COPY --from=make_ca_keys ./rs_ca_private.key .
COPY --from=make_ca_keys ./rs_ca_private.crt .
RUN ["chmod", "+x", "rs_ca_private.key"]
RUN ["chmod", "+x", "rs_ca_private.crt"]
# generate a certificate request
RUN openssl req -nodes -newkey rsa:4096 -sha256 -keyout mongo_rs_2.key -out mongo_rs_2.csr -subj '/C=US/ST=UTAH/L=PLEASANT GROVE/O=JITPOMI/OU=DEV/CN=172.22.1.23'
#  sign it using the CA certificate
RUN openssl  x509 -passin pass:password -CA rs_ca_private.crt -CAkey rs_ca_private.key -CAcreateserial -req -days 365 -in mongo_rs_2.csr -out mongo_rs_2.crt -extensions v3_req -extfile mongo_rs_2.cnf

RUN cat mongo_rs_2.key mongo_rs_2.crt > mongo_rs_2.pem

FROM mongo as mongo_rs_3_image
#COPY --from=make_ca_keys ./rs_private_ca.pem .
#COPY --from=make_ca_keys ./private_ca.pem .
#RUN ["chmod", "+x", "rs_private_ca.pem"]
#RUN ["chmod", "+x", "private_ca.pem"]

COPY mongo_rs_3.cnf .
#RUN openssl req -newkey rsa:4096 -nodes -out mongo_rs_3.csr -keyout mongo_rs_3.key -subj  '/CN=172.22.1.23/OU=MONGO/O=JITPOMI/L=PLEASANTGROVE/ST=UT/C=US'
#RUN openssl x509 -passin pass:password -sha256 -req -days 1825 -in mongo_rs_3.csr -CA private_ca.pem -CAkey rs_private_ca.pem -CAcreateserial -out mongo_rs_3-signed.crt -extensions v3_req -extfile mongo_rs_3.cnf
#RUN cat mongo_rs_3-signed.crt mongo_rs_3.key > mongo_rs_3.pem

COPY --from=make_ca_keys ./rs_ca_private.key .
COPY --from=make_ca_keys ./rs_ca_private.crt .
RUN ["chmod", "+x", "rs_ca_private.key"]
RUN ["chmod", "+x", "rs_ca_private.crt"]
# generate a certificate request
RUN openssl req -nodes -newkey rsa:4096 -sha256 -keyout mongo_rs_3.key -out mongo_rs_3.csr -subj '/C=US/ST=UTAH/L=PLEASANT GROVE/O=JITPOMI/OU=DEV/CN=172.22.1.33'
#  sign it using the CA certificate
RUN openssl x509 -passin pass:password -CA rs_ca_private.crt -CAkey rs_ca_private.key -CAcreateserial -req -days 365 -in mongo_rs_3.csr -out mongo_rs_3.crt -extensions v3_req -extfile mongo_rs_3.cnf

RUN cat mongo_rs_3.key mongo_rs_3.crt > mongo_rs_3.pem

FROM mongo as mongo_replica_init
#COPY --from=make_ca_keys ./rs_private_ca.pem .
#COPY --from=make_ca_keys ./private_ca.pem .
#RUN ["chmod", "+x", "rs_private_ca.pem"]
#RUN ["chmod", "+x", "private_ca.pem"]

# Create key and certificate signing requests (CSR)
# Note that the OU is different between the client and members of the replica set
#RUN openssl req -newkey rsa:4096 -nodes -out client.csr -keyout client.key -subj '/CN=Jitpomi/OU=MONGO_CLIENTS/O=JITPOMI/L=PLEASANTGROVE/ST=UT/C=US'
## Sign the certificate signing requests with CA
#RUN openssl x509 -passin pass:password -sha256 -req -days 1825 -in client.csr -CA private_ca.pem -CAkey rs_private_ca.pem -CAcreateserial -out client-signed.crt
## Create the privacy enhanced mail (PEM) file for mongod
#RUN cat client-signed.crt client.key > client.pem

COPY --from=make_ca_keys ./rs_ca_private.key .
COPY --from=make_ca_keys ./rs_ca_private.crt .
RUN ["chmod", "+x", "rs_ca_private.key"]
RUN ["chmod", "+x", "rs_ca_private.crt"]

COPY client.cnf .
# create CSR file and private key to be used with a certificate
RUN openssl req -nodes -newkey rsa:4096 -sha256 -keyout client.key -out client.csr  -config client.cnf
#  Sign the client CSR using CA public and private key
RUN openssl  x509 -passin pass:password -CA rs_ca_private.crt -CAkey rs_ca_private.key -CAcreateserial -req -days 365 -in client.csr -out client.crt
# Concatenate the key and the signed certificate.
RUN cat client.key client.crt > client.pem
# Validate certificate for username: We need this to create external user.
#RUN openssl x509 -in client.pem -inform PEM -subject -nameopt RFC2253

#copy into docker
COPY ./rs_init.sh /usr/local/bin/
COPY ./auth_init.sh /usr/local/bin/

# add read permissions
RUN ["chmod", "+x", "/usr/local/bin/rs_init.sh"]
RUN ["chmod", "+x", "/usr/local/bin/auth_init.sh"]
