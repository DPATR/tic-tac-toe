#!/bin/bash

# To test authentication, in Terminal, run command below:
  # run sign-in and grab the token; replace TOKEN value below with the new token; replace ID if needed
  # ID=29 TOKEN=BAhJIiU2ZjRiY2MxNjA5ZDViNzA0NzNlN2UyZTlkZjcyMWI2MAY6BkVG--b7fafb2a24df9a49f9bf3a8565e2d2105c68a5a3 sh scripts/sign-out.sh

# API="${API_ORIGIN:-http://httpbin.org}" # use this only for init testing-see lines 3 - 5
# URL_PATH="/delete?id=$ID" # use this only for init testing-see lines 3 - 5
API="${API_ORIGIN:-https://ga-library-api.herokuapp.com}" # use this to ping the actual API server
URL_PATH="/sign-out/$ID" # use this to ping the actual API server

curl "${API}${URL_PATH}" \
  --include \
  --request DELETE \
  --header "Authorization: Token=${TOKEN}"

echo

# "Content-Type: application/x-www-form-urlencoded" \
#--data-urlencode ' {
#  "credentials": {
#    "email": "'"${EMAIL}"'",
#    "password": "'"${PASSWORD}"'"
#  }
#}'
