@ECHO off
:: Running the Skeleton Dapp
TITLE Skeleton Dapp

ECHO CLEARING OLD SMART CONTRACT MIGRATIONS IF ANY...
RMDIR /S /Q build\contracts

ECHO COMPILING AND MIGRATING SMART CONTRACTS...
CALL truffle compile
CALL truffle migrate --reset

ECHO BUILDING WEBPACK CONFIGURATION AND STARTING THE SERVER...
CALL npm run build
CALL npx webpack serve