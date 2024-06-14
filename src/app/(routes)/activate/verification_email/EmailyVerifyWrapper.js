'use client';
import { useSearchParams } from 'next/navigation';
import VerifyEmailComponent from './VerifyEmailComponent';

export default function VerifyEmailWrapper() {
    const searchParams = useSearchParams();
    const tokenParams = searchParams.get('token');

    return <VerifyEmailComponent tokenParams={tokenParams} />;
}