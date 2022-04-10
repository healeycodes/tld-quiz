# TLD-quiz

How well do you know your top-level domains (TLDs)?

Sure, you know `.com` and `.net`. It's not your first time on the Web.

You might even know `.io` and `.so`. But what about `.blue` or, like, `.usa`?

<br>

Visit https://tld-quiz.vercel.app.

## Build

```bash
cd ./app
npm run build
```

## Dev

```bash
cd ./app 
npm run dev
```

## Generate new TLDs

Update `./real-tld-list.txt` from https://www.icann.org/resources/pages/tlds-2012-02-25-en.

```bash
python generate.py
```
