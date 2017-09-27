#!/bin/bash

# Our API is configured to use JSON so we use this specific curl script
# To test authentication, in Terminal, run command below:
  # run sign-in and grab the token; replace TOKEN value below with the new token; replace ID if needed
  # ID=29 OLD_PASSWORD=denise NEW_PASSWORD=dpatriquin TOKEN=BAhJIiU5M2E0MzA5OTc2OWI4NDJiNTFkZTQ0ZGY1MGIxYzUwYQY6BkVG--4709e8514aaa93f6c820e1a12dbde1f56f4e5ac4 sh scripts/change-password-json.sh

# API="${API_ORIGIN:-http://httpbin.org}" # use this only for init testing-see lines 4-6
# URL_PATH="/patch?id=${ID}" # use this only for init testing-see lines 4-6

API="${API_ORIGIN:-https://ga-library-api.herokuapp.com}" # use this to ping the actual API server
URL_PATH="/change-password/${ID}" # use this to ping the actual API server

curl "${API}${URL_PATH}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN" \
  --data '{
    "passwords": {
      "old": "'"${OLD_PASSWORD}"'",
      "new": "'"${NEW_PASSWORD}"'"
    }
  }'

echo
