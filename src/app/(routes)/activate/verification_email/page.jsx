import { Suspense } from 'react';
import VerifyEmailWrapper from '../../../components/blocks/EmailyVerifyWrapper';

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <VerifyEmailWrapper />
        </Suspense>
    );
}