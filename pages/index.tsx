import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useContractRead, useProvider } from "wagmi";
import { useContract } from "wagmi";
import { YourContract__factory } from "../types/ethers-contracts";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";

interface Props {
  data: ethers.utils.Result | undefined;
  isError: boolean;
  isLoading: boolean;
  /* provider: ethers.providers.BaseProvider | undefined; */
}

const Home: NextPage<Props> = () => {
  const provider = useProvider();
  const [cData, setCData] = useState<ethers.utils.Result>();

  const contract = useContract({
    addressOrName: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    contractInterface: YourContract__factory.createInterface(),
    signerOrProvider: provider,
  });
  /* console.log("contract", contract); */

  const { data, isError, isLoading } = useContractRead(
    {
      addressOrName: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
      contractInterface: YourContract__factory.createInterface(),
    },
    "purpose"
  );

  useEffect(() => {
    if (isError && isLoading == false) {
      setCData(data);
      /* console.log("set", data); */
    }
  }, [data, isError, isLoading]);

  return (
    <div className={styles.container}>
      <Head>
        <title>RainbowKit App</title>
        <meta
          name="description"
          content="Generated by @rainbow-me/create-rainbowkit"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <h1 className={styles.title}>
          Welcome to <a href="">RainbowKit</a> + <a href="">wagmi</a> +{" "}
          <a href="https://nextjs.org">Next.js</a> +{" "}
          <a href="https://book.getfoundry.sh/forge/">forge!</a>
        </h1>

        {cData ? (
          <h1>Purpose: {cData}</h1>
        ) : (
          <h1>Purpose: Loading Purpose...</h1>
        )}

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://rainbowkit.com" className={styles.card}>
            <h2>RainbowKit Documentation &rarr;</h2>
            <p>Learn how to customize your wallet connection flow.</p>
          </a>

          <a href="https://wagmi.sh" className={styles.card}>
            <h2>wagmi Documentation &rarr;</h2>
            <p>Learn how to interact with Ethereum.</p>
          </a>

          <a
            href="https://github.com/rainbow-me/rainbowkit-examples"
            className={styles.card}
          >
            <h2>RainbowKit Examples &rarr;</h2>
            <p>Discover boilerplate example RainbowKit projects.</p>
          </a>

          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Next.js Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Next.js Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" target="_blank" rel="noopener noreferrer">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
