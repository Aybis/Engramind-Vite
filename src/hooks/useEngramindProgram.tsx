import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import IDL from "../anchor/engramind.json";

export function useEngramindProgram() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const provider = useMemo(() => {
    if (!wallet) return null;
    return new AnchorProvider(connection, wallet, {
      preflightCommitment: "processed",
    });
  }, [wallet, connection]);

  const program = useMemo(() => {
    if (!provider) return null;
    return new Program(IDL as any, provider);
  }, [provider]);

  return { program, provider };
}
