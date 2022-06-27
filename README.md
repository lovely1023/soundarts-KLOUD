# Drop Contracts

## Build

```
npm i
```

```
npm run build
```

## Deploy

First fill out the config file in `./scripts/config/config.ts`

```
npx hardhat deploy-basetoken --network mainnet
```

Then add its address to the same config file before running:


```
npx hardhat verify-token --network mainnet
```

Minter next

```
npx hardhat deploy-minter --network mainnet
```

Then add minter address to the config.

```
npx hardhat verify-minter --network mainnet
```

Auction Next

```
npx hardhat deploy-auction --network mainnet
```

Then add auction address to the config.

```
npx hardhat verify-auction --network mainnet
```


## Initialize


```
npx hardhat set-price --etherprice "0.125" --network mainnet
npx hardhat grant-minter-role --network mainnet
npx hardhat set-max-supply --maxsupply 5000 --network mainnet
```


## Auction

npx hardhat reserve-one --network mainnet
npx hardhat send-to-auction --tokenid "1" --network mainnet
npx hardhat create-auction --tokenid "1" --network mainnet

npx hardhat settle-auction --network mainnet

## Sales

```
## Whitelist sale
npx hardhat set-minter-signer --network mainnet
npx hardhat set-max-per-wallet --max 2 --network mainnet
npx hardhat set-max-per-block --max 2 --network mainnet

npx hardhat start-signed-mint --network mainnet

## Full sale
npx hardhat start-signed-mint --network mainnet

npx hardhat start-mint --network mainnet

npx hardhat set-price --etherprice "0.3" --network mainnet

npx hardhat set-price --etherprice "0.275" --network mainnet

npx hardhat set-price --etherprice "0.25" --network mainnet

npx hardhat set-price --etherprice "0.225" --network mainnet

npx hardhat set-price --etherprice "0.2" --network mainnet

npx hardhat set-price --etherprice "0.175" --network mainnet

npx hardhat set-price --etherprice "0.15" --network mainnet

npx hardhat set-price --etherprice "0.125" --network mainnet

npx hardhat set-price --etherprice "0.1" --network mainnet

```

## Roles

```
npx hardhat grant-token-admin --network mainnet --address 0xd3682aC636f4FD74C9b904FC6C7cA8f22D2798f0
npx hardhat grant-token-admin --network mainnet --address 0xF331d6bcCDe6544C9bEd326c871960D6d84499E4
npx hardhat grant-minter-admin --network mainnet --address 0xd3682aC636f4FD74C9b904FC6C7cA8f22D2798f0
npx hardhat grant-minter-admin --network mainnet --address 0xF331d6bcCDe6544C9bEd326c871960D6d84499E4


npx hardhat transfer-auction-owner --network mainnet --address 0xd3682aC636f4FD74C9b904FC6C7cA8f22D2798f0


```

## Metadata

npx hardhat set-baseuri --baseuri https://soundmint-public.s3.amazonaws.com/KLOUD_2021_5000/prereveal_meta/ --network rinkeby
npx hardhat set-tokenuri --tokenid 1 --tokenuri https://soundmint-public.s3.amazonaws.com/KLOUD_2021_5000/oneOfone/1 --network rinkeby
npx hardhat push-metadata-update --totalsupply 10 --network rinkeby