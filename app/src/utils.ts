import { BigNumber, ethers } from 'ethers';

export type TransactionState = 'pristine' | 'pending' | 'failed' | 'success'

export const formatPrice = (price: string, decimals: number): string => {
  return parseFloat(
    ethers.utils.formatUnits(Math.floor(Number(price)).toString(), 18)
  ).toFixed(decimals);
};

// export const getEtherscanLink = (transaction)

export const toBigNumber = (price: string): BigNumber => {
  return BigNumber.from(price);
};

export function secondsSinceEpoch(d: number) {
  return Math.floor(d / 1000);
}

export function addMinutes(timeStamp: number, minutes: number): number {
  return timeStamp + minutes * 60000;
}

export function addHours(timeStamp: number, hours: number): number {
  return timeStamp + hours * 3600000;
}

export function addDays(timeStamp: number, days: number): number {
  return timeStamp + days * 86400000;
}

export const padMinuteWithZero = (minuteString: string) => {
  return minuteString.length === 1 ? `0${minuteString}` : minuteString;
};

export const hoursAndMinutesToMilliseconds = (timeString: string): number => {
  const hours = timeString.split(':')[0];
  const minutes = timeString.split(':')[1];
  return parseInt(hours) * 3600000 + parseInt(minutes) * 60000;
};

export const getTimeStamp = (hoursAndMinutes: string, date: Date): number => {
  return (
    (date.getTime() + hoursAndMinutesToMilliseconds(hoursAndMinutes)) / 1000
  );
};

export const getTimeStringFromTimestamp = (timestamp: number): string => {
  return new Date(timestamp * 1000).toISOString().split('T')[1].slice(0, 5);
};

export const getDateStringFromTimestamp = (timestamp: number): string => {
  return new Date(timestamp * 1000).toISOString().split('T')[0];
};

export const getDayMontYearFromTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const month = date.toLocaleString('default', { month: 'short' });
  return date.getDate() + ' ' + month + ' ' + date.getFullYear();
};

export const toMidnight = (date: Date): Date => {
  return new Date(date.setUTCHours(0, 0, 0, 0));
};

export const shortenAddress = (address?: string): string => {
  if (address) {
    return `${address.slice(0, 6)}...${address.slice(address.length - 5)}`;
  } else {
    return '????';
  }
};

export const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) {
    return '00:00';
  }

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, '0');

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
  }

  return `${mm}:${ss}`;
};

export const formatEther = (wei: ethers.BigNumberish): number => {
  return wei ? Number(ethers.utils.formatEther(wei)) : 0;
};

export const timestampToTimeString = (timestamp: number): string => {
  const date = new Date(timestamp);

  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

/*
  Claim Status Utils

  These utils help store and retrieve claim state

  Claim state is stored in local storage as an array
  each item of the array represent a bid and claim on a lot
  [{
    lotId: '0x2d',
    bidId: '29',
    claimStatus: 'success'/'fail'
  }]
*/

interface ClaimStatus {
  bidId: string;
  claimStatus: string;
  lotId: string;
}

const CLAIM_STORAGE_KEY = 'CLAIM_STORAGE_KEY'

export const retrieveClaimStatus = (lotId: string) => {
  console.log('About to retrieve claim status by lotId:', lotId)
  const claimStatusesAsString = localStorage.getItem(CLAIM_STORAGE_KEY)
  if(claimStatusesAsString) {
    const claimStatuses = JSON.parse(claimStatusesAsString) as ClaimStatus[]
    const match = claimStatuses.find(c => c.lotId === lotId)
    console.log({ claimStatuses, match })
    return match
  } else {
    return null
  }
}

export const doesClaimExist = (lotId: string) => {
  const match = retrieveClaimStatus(lotId)
  return !!match
}

export const storeClaimStatus = (claimStatus: ClaimStatus) => {
  console.log('About to store claim status', claimStatus)
  const claimStatusesAsString = localStorage.getItem(CLAIM_STORAGE_KEY)
  if(claimStatusesAsString) {
    const claimStatuses = JSON.parse(claimStatusesAsString) as ClaimStatus[]
    const match = claimStatuses.find(c => c.lotId === claimStatus.lotId)
    if (match) {
      console.log('matching claimstatus found, not overriding previous record')
    } else {
      const newClaimStatuses = [claimStatus, ...claimStatuses]
      const asString = JSON.stringify(newClaimStatuses)
      localStorage.setItem(CLAIM_STORAGE_KEY, asString)
    }
    return match
  } else {
    const claimStatuses = [claimStatus]
    const asString = JSON.stringify(claimStatuses)
    localStorage.setItem(CLAIM_STORAGE_KEY, asString)
  }
}