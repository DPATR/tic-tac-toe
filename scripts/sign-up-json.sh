#!/bin/bash

# sh scripts/sign-up-json.sh
# Our API is configured to use JSON so we use this specific curl script
# To test authentication, in Terminal, run command below:
  # EMAIL='denise' PASSWORD='denise' sh scripts/sign-up-json.sh

# API="${API_ORIGIN:-http://httpbin.org}" # use this only for init testing-see lines 5 & 6
# URL_PATH="/post" # use this only for init testing-see lines 5 & 6
API="${API_ORIGIN:-http://tic-tac-toe.wdibos.com}" # use this to ping the actual API server
URL_PATH="/sign-up" # use this to ping the actual API server

# cannot use COMMENTS IN THE CURL SCRIPT BELOW - WILL BREAK IT
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
