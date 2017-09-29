#!/bin/bash

# sh scripts/sign-in-json.sh
# Our API is configured to use JSON so we use this specific curl script
# To test authentication, in Terminal, run command below:
  # EMAIL='denise' PASSWORD='denise' sh scripts/sign-in-json.sh

# API="${API_ORIGIN:-http://httpbin.org}" # use this only for init testing-see lines 5 & 6
# URL_PATH="/post" # use this only for init testing-see lines 5 & 6
API="${API_ORIGIN:-http://tic-tac-toe.wdibos.com}" # use this to ping the actual API server
URL_PATH="/sign-in" # use this to ping the actual API server

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
       "email": "'"${EMAIL}"'",
       "password": "'"${PASSWORD}"'",
       "password_confirmation": "'"${PASSWORD}"'"
    }
  }'

echo
