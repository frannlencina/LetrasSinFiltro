import { Suspense } from 'react';
import VerifyEmailWrapper from './EmailyVerifyWrapper';

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <VerifyEmailWrapper />
        </Suspense>
    );
}