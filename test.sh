#!/bin/bash
c=1
while [ $c -le 15000 ]
do
	curl -X POST \
  http://localhost:8000/api/barangy/fmleader/record \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: b16478e9-d2f6-45a7-a472-5a7c1828a441' \
  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFudGhvbnlkIiwiaWQiOiI1YjBiYzAxMGM4OWI1YzY4NWFjYmQxMzAiLCJpYXQiOjE1Mjg4NzAyMjYsImV4cCI6MTUyODk1NjYyNn0.FLj9Tvp6W8v-WRZex-R9uPBOa5XlmTIKLTUXFPBwb28' \
  -d '{
	"lname":"ABACAHIN",
	"fname":"MARIA LUZ",
	"mname":"JEREZON",
	"brngy":"agus"
}'
	(( c++ ))
done