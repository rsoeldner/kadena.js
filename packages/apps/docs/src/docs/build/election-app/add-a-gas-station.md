---
title: "Add a gas station"
description: "Prepare a gas station module to pay the transaction fees for account holders who cast votes in the election application."
menu: "Workshop: Election application"
label: "Add a gas station"
order: 9
layout: full
tags: [pact, smart contract, typescript, tutorial]
---

# Add a gas station

Traditional elections have minimal safeguards against fraud, corruption, mishandling of ballots, and intentional or unintentional disruptions.
Even where voting is available by mail or online, elections can be costly, inefficient, and subject to human error.

By using blockchain technology, elections could be made more convenient, transparent and reliable.
For example:

- Every vote can be recorded as a public transaction that can't be altered.
- Voters can remain anonymous with votes linked to an encrypted digital fingerprint instead of government-issued identification.
- Election results can be independently verified by anyone.

However, there is one main drawback to using a blockchain to cast votes in an election.
Because every vote is a public transaction that changes the state of the blockchain, every vote requires computational resources and incurs a processing fee—commonly referred to as a **gas** payment.

Paying for transaction processing is normal in the context of many business operations, but paying to vote is essentially undemocratic. 
To address this issue, Kadena introduced a transaction processing clearing house for paying fees called a **gas station**.

A gas station is an account that exists only to make transaction fee payments on behalf of other accounts and under specific conditions.
For example, a government agency could apply a fraction of its budget for a traditional election to fund a gas station.
The gas station could then pay the transaction fee for every voting transaction, allowing all citizens to vote for free.

For more information about the introduction of gas stations, see [The First Crypto Gas Station is Now on Kadena’s Blockchain](/blogchain/2020/the-first-crypto-gas-station-is-now-on-kadenas-blockchain-2020-08-06).

## Before you begin

Before you start this tutorial, verify the following basic requirements:

- You have an internet connection and a web browser installed on your local computer.
- You have a code editor, such as [Visual Studio Code](https://code.visualstudio.com/download), access to an interactive terminal shell, and are generally familiar with using command-line programs.
- You have cloned the [election-dapp](https://github.com/kadena-community/voting-dapp.git) repository as described in [Prepare your workspace](/build/guides/election-dapp-tutorial/prepare-your-workspace).
- You have the development network running in a Docker container as described in [Start a local blockchain](/build/guides/election-dapp-tutorial/start-a-local-blockchain).
- You are [connected to the development network](/build/guides/election-dapp-tutorial/start-a-local-blockchain#connect-to-the-development-network) using your local host IP address and port number 8080.
- You have created and funded an administrative account as described in [Add an administrator account](/build/guides/election-dapp-tutorial/add-admin-account).
- You have created a principal namespace on the development network as described in [Define a namespace](/build/guides/election-dapp-tutorial/define-a-namespace).
- You have defined the keyset that controls your namespace using the administrative account as described in [Define keysets](/build/guides/election-dapp-tutorial/define-keysets).
- You have created an election Pact module and deployed it as described in [Write a smart contract](/build/guides/election-dapp-tutorial/write-a-smart-contract).
- You have updated and deployed the election smart contract on the development network as described in [Nominate candidates](/build/guides/election-dapp-tutorial/nominate-candidates) and [Add vote management](/build/guides/election-dapp-tutorial/add-vote-management).

## Create a voter account

In the previous tutorial, you voted with your administrative account. 
The transaction was successful because the account had sufficient funds to pay the transaction fee. 
For this tutorial, you need to create a new voter account on development network. 
Initially, you'll use the voter account to see that voting transactions in the election application require funds.

The steps for creating the voter account are similar to the steps you followed to create your administrative account.

To create a voter account:

1. Verify the development network is currently running on your local computer.

2. Open Chainweaver.

3. Select **devnet** from the network list.

4. Click **Keys** in the Chainweaver navigation panel.

5. Click **Generate Key** to add a new public key to your list of public keys.

6. Click **Add k: Account**  for the new public key to add a new account to the list of accounts you are watching in Chainweaver.

   If you expand the new account, you'll see that no balance exists for the account on any chain and there's no information about the owner or keyset for the account.

7. Open the `election-dapp/snippets/create-account.ts` file in the code editor on your computer.

   This script uses the Kadena client to call the `create-account` function of the `coin` contract to create a voter account.
   After importing the dependencies and creating the client with the `devnet` configuration, the script calls the `main` function.
   You'll notice that this script is similar to the `./snippets/transfer-create.ts` script you used previously.
   However, this script doesn't pass funds to the executed function and it isn't necessary to sign for the `COIN.TRANSFER` capability. 
   
8. Open the `election-dapp/snippets` folder in a terminal shell on your computer. 

9.  Run the following command to create a new voter account. Replace `k:account` with your voter account.

   ```bash
   npm run create-account:devnet -- k:<voter-public-key>
   ```


   Remember that `k:<voter-public-key>` is the default **account name** for the new voter account that you generated keys for.
   You can copy this account name from Chainweaver when viewing the account watch list.

   After a few seconds, you should see a status message:

   ```bash
   { status: 'success', data: 'Write succeeded' }
   ```

10. Verify that the account was created by checking the account details using the Kadena client:

   ```bash
   npm run coin-details:devnet -- k:<voter-public-key>
   ```
   
   After running this command, you should see output similar to the following for the new voter account:

   ```bash
   {
     guard: {
       pred: 'keys-all',
       keys: [
         'bbccc99ec9eeed17d60159fbb88b09e30ec5e63226c34544e64e750ba424d35e'
       ]
     },
     balance: 0,
     account: 'k:bbccc99ec9eeed17d60159fbb88b09e30ec5e63226c34544e64e750ba424d35e'
   }
   ```

   If you view the account in Chainweaver, you'll see similar information for the new account.

## Attempt to cast a vote

To attempt to cast a vote with the voter account:

1. Verify the development network is currently running on your local computer.

2. Open and unlock the Chainweaver desktop or web application and verify that:
   
   - You're connected to **development network (devnet)** from the network list.
   - Your voter account name with the **k:** prefix exists on chain 1.
   - Your voter account name has no KDA account balance (0) on chain 1. 

3. Open the `election-dapp/frontend` folder in a terminal shell on your computer. 

4. Install the frontend dependencies by running the following command:
   
   ```bash
   npm install
   ```

5. Start the frontend application configured to use the `devnet` backend by running the following command: 

   ```bash
   npm run start-devnet
   ```

6. Open `http://localhost:5173` in your browser and verify that there's at least one candidate listed.

7. Click **Set Account**.
8. Paste your voter account name, then click **Save**.
9. Click **Vote Now** for a candidate, sign the transaction, then open the Developer Tools for your browser and view the console output.

   In the console, you'll see an error similar to the following:
   
   ```console
   Attempt to buy gas failed with: (enforce (<= amount balance) "...: Failure: Tx Failed: Insufficient funds`, proving that it is indeed not possible to vote with an account that has zero balance.
   ```

## Implement gas station interface

The `election-gas-station` will become the second module in your `election` smart contract.
Create a file `./pact/election-gas-station.pact` with the following content. Replace the
namespace with your own principal namespace. Just like the `election` module, this module
will be governed by the `admin-keyset`.

```pact
(namespace 'n_fd020525c953aa002f20fb81a920982b175cdf1a)

(module election-gas-station GOVERNANCE
  (defcap GOVERNANCE ()
    (enforce-keyset "n_fd020525c953aa002f20fb81a920982b175cdf1a.admin-keyset")
  )

  (implements gas-payer-v1)
)
```

Create a `./pact/election-gas-station.repl` file as follows, to verify that the module
loads correctly. Run the file.

```pact
(load "setup.repl")

(begin-tx "Load election gas station module")
  (load "root/gas-payer-v1.pact")
  (load "election-gas-station.pact")
(commit-tx)
```

You will notice that the module does not load correctly. Because you merely defined that
the module should implement the `gas-payer-v1` interface, but you have not actually implemented
that interface yet, the error
`Error: found unimplemented member while resolving model constraints: GAS_PAYER` appears.
You can find the signature of this capability in `./pact/root/gas-payer-v1.pact`. It is
included in this project, so you can test your module that relies on it, in the Pact
REPL. This interface is already pre-installed on Devnet, Testnet and Mainnet. Therefore,
it is not needed to deploy it along with your `election-gas-station` module. The documentation
inside the `gas-payer-v1` interface file states that `GAS_PAYER` should compose a capability.
You can include a capability within a capability using the built-in `compose-capability`
function. Add a capability `ALLOW_GAS` that always returns `true` and compose the `GAS_PAYER`
capability with it as follows. Then, run `./pact/election-gas-station.repl` again.

```pact
(defcap GAS_PAYER:bool
  ( user:string
    limit:integer
    price:decimal
  )
  (compose-capability (ALLOW_GAS))
)

(defcap ALLOW_GAS () true)
```

The test will now fail with
`Error: found unimplemented member while resolving model constraints: create-gas-payer-guard`.
Indeed, there is a function `create-gas-payer-guard` defined in the `gas-payer-v1` interface
that still needs to be implemented. The documentation inside is a bit cryptic, but it suggests
to require something like the `GAS_PAYER` capability without the parameters. To achieve this,
you can leverage the built-in function `create-capability-guard` and pass the `ALLOW_GAS`
capability into it. The function will return a guard that requires the respective capability.

```pact
(namespace 'n_fd020525c953aa002f20fb81a920982b175cdf1a)

(module election-gas-station GOVERNANCE
  (defcap GOVERNANCE ()
    (enforce-keyset "n_fd020525c953aa002f20fb81a920982b175cdf1a.admin-keyset")
  )

  (implements gas-payer-v1)

  (defcap GAS_PAYER:bool
    ( user:string
      limit:integer
      price:decimal
    )
    (compose-capability (ALLOW_GAS))
  )

  (defcap ALLOW_GAS () true)

  (defun create-gas-payer-guard:guard ()
    (create-capability-guard (ALLOW_GAS))
  )
)
```

Run `./pact/election-gas-station.repl` again and observe that the test loads successfully.
Now that you have a working implementation of the `gas-payer-v1` interface, you can deploy
your new module to Devnet so you can test if it can already pay the gas fee for votes
cast via the election website.

## Deploy to devnet

Open up a terminal and change the directory to the `./snippets` folder in the root of
your project. Execute the `./deploy-gas-station.ts` snippet by running the following command.
Replace `k:account` with your admin account. The content of `./deploy-gas-station.ts` is
roughly the same as `./deploy-module.ts`, except that it deploys the 
`./pact/election-gas-station.repl` file.

```bash
npm run deploy-gas-station:devnet -- k:account
```

The Chainweaver window usually comes to the foreground as soon as there is a new signing
request for one of your accounts. If not, manually bring the Chainweaver window
to the foreground. You will see a modal with details of the signing request.
Click `Sign All` to sign the request and switch back to your terminal window.
If everything went well, you will see something similar to the following output.

```bash
{
  status: 'success',
  data: 'Loaded module n_fd020525c953aa002f20fb81a920982b175cdf1a.election-gas-station, hash HM4XCH_oYiXxIx6mjShn2COyOfRhK3u4A37yqomNI0c'
}
```

Congratulations! You have added a second module to your smart contract. You deployed the
`election-gas-station` module that is governed by the `admin-keyset` in your principal namespace on your local Devnet.
If you would now run the `list-modules:devnet` script, you will find your new module in the list
of deployed modules.

```bash
npm run list-modules:devnet
```

## Voting

Open the file `frontend/src/repositories/vote/DevnetVoteRepository.ts` and in the `vote`
function change the line `.addSigner(accountKey(account))` into the following.

```pact
.addSigner(accountKey(account), (withCapability) => [
  withCapability(`${NAMESPACE}.election-gas-station.GAS_PAYER`, account, { int: 0 }, { decimal: '0.0' }),
])
```

This scopes the signature of the account that votes to the `GAS_PAYER` capability. The voter account name and
zero (unlimited) limits for the amount of gas and the gas price are passed as arguments. Also, change the
`senderAccount` in the transaction's metadata to `'election-gas-station'`, to indicate that the election
gas station account will pay the gas fee of the transaction instead of the voter account.

Return to the election website and try to vote again with the voter account. The transaction will still fail
with the error: `Failure: Tx Failed: Insufficient funds`. Apparently, the gas station does not work as it is
supposed to, yet. The reason is that the gas station module attempts to pay for gas using the `senderAccount`,
but this account does not exist. It has to be created first. It also needs to have a positive KDA balance.
Otherwise, the transaction will still fail due to insufficient funds in the gas station account.

## Create the gas station account

Actually, `election-gas-station` is not the most ideal name for the gas station account. As explained in the
recommended reading, it is more secure to use a principal account name. Whereas your admin and voter accounts
are guarded by a keyset, the gas station account will be guarded by the `ALLOW_GAS` capability. The gas station
account is thus an example of a capability guarded account. The built-in Pact function `create-pincipal` can
automatically create an account name based on a capability guard for you if you pass the capability guard as
the first and only argument into it. The resulting account name will be prefixed with the `c:` of `capability`.
Define the gas station account name as a constant at the bottom of the `election-gas-station` module in the
`./pact/election-gas-station.pact` file.

```pact
(defconst GAS_STATION_ACCOUNT (create-principal (create-gas-payer-guard)))
```

Update the `./pact/election-gas-station.repl` file as follows to print out the capability guarded gas station
account name when you run the file.

```pact
(load "setup.repl")

(begin-tx "Load election gas station module")
  (load "root/gas-payer-v1.pact")
  (load "election-gas-station.pact")
  [GAS_STATION_ACCOUNT]
(commit-tx)
```

In the `./pact/election-gas-station.pact` file, you can use the `create-account` function of the
`coin` module to create the gas station account in a function called `init` in the `election-gas-station`
module, as follows. The first argument of the function is the account name you just defined and the second
argument is the guard for the account.

```pact
(defun init ()
  (coin.create-account GAS_STATION_ACCOUNT (create-gas-payer-guard))
)
```

Add an if-statement after the module declaration that calls this `init` function if the module is deployed with
data `{ "init": true }`.

```pact
(if (read-msg 'init)
  [(init)]
  ["not creating the gas station account"]
)
```

Update `./pact/election-gas-station.repl` to set `init` to true for the next transactions, by adding the following
code after loading `setup.repl`. Run the file again to verify that the election module still works before you upgrade
the module on Devnet.

```pact
(env-data
  { 'init: true }
)
```

Open a terminal window and upgrade the `election-gas-station` module on Devnet by executing the following command
in the `./snippets` folder of your project. Replace `k:account` with your admin account.

```bash
npm run deploy-gas-station:devnet -- k:account upgrade init
```

Verify that the gas station account now exists with a 0 KDA balance on Devnet by running the
following script. Replace `c:account` with the actual gas station account name that you printed by running
`./pact/election-gas-station.repl`.

```bash
npm run coin-details:devnet -- c:account
```

If everything went well, you should see output similar to this.

```bash
{
  guard: {
    cgPactId: null,
    cgArgs: [],
    cgName: 'n_fd020525c953aa002f20fb81a920982b175cdf1a.election-gas-station.ALLOW_GAS'
  },
  balance: 0,
  account: 'c:Jjn2uym_xGD32ojhWdPjB5mgIbDwgXRRvkWmFl5n4gg'
}
```

The account details show the capability guard that guards the gas station account and was used to generate
the `c:` account name. Notice how the `ALLOW_GAS` capability is prefixed with the module name as well as your
principal namespace. Since the principal namespace is based on your admin keyset, and the principal account
of the gas station is based on a capability including that principal namespace, it can be concluded that the
gas station account name you created is unique to your admin account. This makes it impossible for someone else
with a different keyset to squat your gas station account on another chain. That is how principal accounts in
principal namespaces provide better security than vanity account names in the `free` namespace.

## Fund the gas station account

Execute the `./transfer.ts` snippet by running the following command to transfer 1 KDA from your admin
account to the gas station account. Replace `k:account` with your admin account and replace `c:account`
with the actual account name of your gas station. The transaction
inside this file is similar to `./transfer-create.ts`, except that it does not use the special
`sender00` account, but your own election admin account to transfer KDA from. Therefore, the transaction
needs to be signed with Chainweaver instead of a private key. Also, the `transfer` function of the
`coin` module is used. This function requires that the receiving account already exists on the
blockchain and will not create the account if it does not exist like `transfer-create` would.

```bash
npm run transfer:devnet -- k:account c:account 1
```

Verify that the election gasstation account now has a 1 KDA balance on Devnet by running the
following script again. Replace `c:account` with the actual account name of your gas station.

```bash
npm run coin-details:devnet -- c:account
```

Now, everything should be set to allow voters to vote for free, because the `election-gas-station`
account can pay the gas fee charged for the voting transaction.

## Vote again

Open the file `frontend/src/repositories/vote/DevnetVoteRepository.ts` and in the `vote`
function change the value of `senderAccount` from `election-gas-station` to the `c:account` of the gas
station that you created.

Vist the election website in your browser, set the account to your voter account and vote for one of the
candidates in the list. Unfortunately, the transaction still fails but this time with a
different error: `Keyset failure`. This error occurs because the signature is not scoped to
the `ACCOUNT-OWNER` capability used in `./pact/election.repl`. When you created this capability
in the previous chapter, you did not scope the signatures to capabilities in `./pact/voting.repl`
either. So, why was it still possible to vote with the voter account?

```pact
(env-sigs
  [{ 'key  : "voter"
   , 'caps : []
  }]
)

(begin-tx "Vote as voter")
  (use n_fd020525c953aa002f20fb81a920982b175cdf1a.election)
  (vote "voter" "1")
  (expect
    "Candidate A has 2 votes"
    2
    (at 'votes (at 0 (list-candidates)))
  )
(commit-tx)
```

The `caps` field in the signature passed to `env-sigs` is an empty array. As a consequence, the
signature of the transaction is not scoped to any capability and the signer automatically
approves all capabilities required for the function execution. In the `vote` function of
`frontend/src/repositories/vote/DevnetVoteRepository.ts` you scoped the signature of the
transaction to the `GAS_PAYER` capability, but not to the `ACCOUNT-OWNER` capability. When
you sign for some capabilities but not all capabilities required for execution of a transaction,
the execution will fail at the point where a capability is required that you did not sign for.
Therefore, you need to add a second capability to the array passed to `addSigners` in
the `vote` function in `frontend/src/repositories/vote/DevnetVoteRepository.ts`.

```typescript
withCapability(`${NAMESPACE}.election.ACCOUNT-OWNER`, account),
```

Now, try to vote again using the voter account on the election website. Sign the transaction
and wait for it to complete. If all is well, you will see the number of votes on your favorite
candidate increase by one. You have successfully exercised your democratic rights on the
Kadena blockchain!

## Add rules and guards

There are still a few things left to add to the gas station module to make it more secure.

### Transaction gas price limit

First, you can enforce an upper limit for the gas price of the transaction to ensure that
the funds of the gas station account cannot be drained to quickly. Add the following functions
to retrieve the transaction's gas price from the metadata of the transaction using the
built-in `chain-data` function and to enforce it to be below a given limit.

```pact
(defun chain-gas-price ()
  (at 'gas-price (chain-data))
)

(defun enforce-below-or-at-gas-price:bool (gasPrice:decimal)
  (enforce (<= (chain-gas-price) gasPrice)
    (format "Gas Price must be smaller than or equal to {}" [gasPrice]))
)
```

Then, call `(enforce-below-or-at-gas-price 0.000001)` right before `(compose-capability (ALLOW_GAS))`.

### Limit accessibility

Second, any module can use your gas station as it is, which can become quite costly when the
word spreads. Especially, since any kind of transaction is allowed and heavy transactions cost even
more gas than lighter transactions.

There are two types of Pact transactions: `exec` and `cont`. `cont` transaction
is used for multi-step pacts, while `exec` is for regular transactions. Limit the usage to `exec`
transactions by adding the following line to the start of the body of the `GAS_PAYER` `defcap`.

```pact
(enforce (= "exec" (at "tx-type" (read-msg))) "Can only be used inside an exec")
```

An `exec` transaction can contain multiple function calls. Allow only one function call by adding
the following line after the previous one.

```pact
(enforce (= 1 (length (at "exec-code" (read-msg)))) "Can only be used to call one pact function")
```

To limit usage of the gas station to pay for gas consumed only by functions defined in your module,
add the following line. Replace the namespace with your own principal namespace.

```pact
(enforce
  (= "(n_fd020525c953aa002f20fb81a920982b175cdf1a.election." (take 52 (at 0 (at "exec-code" (read-msg)))))
  "Only election module calls are allowed"
)
```

## Final checks

Take the time to run the different `.repl` files you created and verify that all tests are still passing.
If you are up to the challenge, try to add some tests in the Pact REPL to verify the behavior of the
election gas station on your own. Then, open up a terminal and change the directory to the `./snippets`
folder in the root of your project. Execute the `./deploy-gas-station.ts` snippet by running the following
command to upgrade the `election-gas-station` module and complete the project. Replace `k:account` with
your admin account.

```bash
npm run deploy-gas-station:devnet -- k:account upgrade
```

## Next steps

In this chapter, you added a second module to your smart contract: the `election-gas-station`. You
built the gas station from the ground up, secured it and deployed it to Devnet. You learned that
Kadena's gas station mechanism allows someone else to automatically pay the gas fee for transactions
of others under certain conditions. This enables voters to vote for free via a website that uses
a smart contract on the blockchain as its back-end. By completing this project, you are able to
demonstrate and explain that online elections on the blockchain are more efficient, transparent
and reliable than traditional elections. The only remaining challenge is that it is currently
possible to
vote more than once by simply creating multiple Kadena accounts. To comply with the law, the
Kadena accounts that are allowed to vote should somehow be linked to the social security numbers
of citizens of voting age as stored in legacy government systems. Or, perhaps, everyone should
just get a Kadena account instead of a social security number at birth. Anyway, there are several
technical and theoretical solutions for such last hurdle. Food for thought.

As a next step, you could deploy the election website online and deploy the election smart contract
to Testnet. This will allow anyone to take part in your online election. In the future, more chapters
will be added to this tutorial, or new tutorials will be created, to teach you how to do that. You can
also experiment with signing methods other than Chainweaver. If there is anything you feel is missing
from this tutorial, please let us know, so we can keep improving.