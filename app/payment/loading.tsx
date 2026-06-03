export default function PaymentLoading() {
  return (
    <main className="grid min-h-screen place-items-center bg-light-bg px-4">
      <div className="rounded-[2rem] bg-white p-8 text-center shadow-luxury">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-royal/10 border-t-success" />
        <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-primary-blue">Verifying payment</p>
      </div>
    </main>
  );
}
