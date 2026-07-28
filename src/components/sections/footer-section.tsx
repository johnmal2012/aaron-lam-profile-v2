interface FooterSectionProps {
  clinicName: string;
  clinicAddress: string;
}

export default function FooterSection({
    clinicName,
    clinicAddress
}: FooterSectionProps) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-200 px-6 py-10 text-gray-600">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <h3 className="text-lg font-semibold">{clinicName}</h3>

          <p className="text-sm text-gray-500">{clinicAddress}</p>
        </div>

        <p className="text-sm text-gray-500">
          © {currentYear} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
