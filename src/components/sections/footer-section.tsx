import { Clinic } from '@/lib/types/clinic';

interface FooterSectionProps {
  //   clinicName: string;
  //   clinicAddress: string;
  clinics: Clinic[];
}

export default function FooterSection({
  //   clinicName,
  //   clinicAddress,
  clinics,
}: FooterSectionProps) {
  const currentYear = new Date().getFullYear();
  return (
    // <footer className="bg-slate-200 px-6 py-10 text-gray-600">
    //   <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
    //     <div>
    //       <h3 className="text-lg font-semibold">{clinicName}</h3>

    //       <p className="text-sm text-gray-500">{clinicAddress}</p>
    //     </div>

    //     <p className="text-sm text-gray-500">
    //       © {currentYear} All Rights Reserved.
    //     </p>
    //   </div>
    // </footer>
    <footer className="bg-slate-200 px-6 py-10 text-gray-600">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {clinics.map((clinic, index) => (
            <div key={`${clinic.name}-${clinic.address}-${index}`}>
              <h3 className="text-sm font-semibold text-slate-800">
                {clinic.name}
              </h3>

              <p className="mt-1 text-sm text-gray-500">{clinic.address}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-slate-300 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © {currentYear} All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
