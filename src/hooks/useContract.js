import { useCallback } from "react";
import { ethers } from "ethers";
import abi from "../abi.json";

const CONTRACT_ADDRESS = "0xb0f5e0771ba791DB4eE518D73055582a28bBe712";

export function getContract(signerOrProvider) {
  return new ethers.Contract(CONTRACT_ADDRESS, abi, signerOrProvider);
}

/**
 * Returns contract instance with signer (for write) and helpers.
 * Assumes window.ethereum and account are available when used.
 */
export function useContract() {
  const getProvider = useCallback(async () => {
    if (!window.ethereum) throw new Error("MetaMask not installed");
    return new ethers.BrowserProvider(window.ethereum);
  }, []);

  const getSigner = useCallback(async () => {
    const provider = await getProvider();
    return provider.getSigner();
  }, [getProvider]);

  const getContractReadOnly = useCallback(async () => {
    const provider = await getProvider();
    return getContract(provider);
  }, [getProvider]);

  const getContractWithSigner = useCallback(async () => {
    const signer = await getSigner();
    return getContract(signer);
  }, [getSigner]);

  return {
    getProvider,
    getSigner,
    getContractReadOnly,
    getContractWithSigner,
    contractAddress: CONTRACT_ADDRESS,
  };
}
