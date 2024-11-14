import { prepareContractCall, sendTransaction } from "thirdweb";

const transaction = await prepareContractCall({
  contract,
  method: "function uploadFile(string _fileHash, string _metadata)",
  params: [_fileHash, _metadata]
});
const { transactionHash } = await sendTransaction({
  transaction,
  account
});