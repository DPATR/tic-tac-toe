#!/bin/bash

curl --include --request POST http://tic-tac-toe.wdibos.com/games \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN" \
  # --data

echo
