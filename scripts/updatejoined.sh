#!/bin/bash

# This curl script is only for the BONUS

curl --include --request PATCH "http://tic-tac-toe.wdibos.com/games/${ID}" \
--header "Content-Type: application/json" \
--header "Authorization: Token token=$TOKEN" \
# --data

echo

# curl --include --request PATCH "http://tic-tac-toe.wdibos.com/games/${ID}" \
#   --header "Content-type: application/json" \
#  --data '{
#    "book": {
#      "title": "'"${NEW-TITLE}"'",
#      "author": "'"${NEW-AUTHOR}"'"
#    }
#  }'

echo

# Alternatively
# API="${API_ORIGIN:-https://ga-library-api.herokuapp.com}"
# URL_PATH="/books/${ID}"
# curl "${API}${URL_PATH}" \
#   --include \
#   --request PATCH \
#   --header "Content-type: application/json" \
#   --data '{
#     "book": {
#       "title": "'"${NEW-TITLE}"'",
#       "author": "'"${NEW-AUTHOR}"'"
#     }
#   }'
#
# echo
