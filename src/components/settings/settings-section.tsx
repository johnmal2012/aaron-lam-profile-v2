type SettingsSectionProps = {
  title: string;
  borderColor: string;
  children: React.ReactNode;
};

export function SettingsSection({
  title,
  borderColor,
  children,
}: SettingsSectionProps) {
  return (
    <section
      className={`space-y-4 rounded-b-md border border-t-8 ${borderColor} p-4`}
    >
      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      {children}
    </section>
  );
}