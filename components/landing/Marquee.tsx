const ITEMS = [
  'Kubernetes',
  'EKS',
  'GKE',
  'AKS',
  'Prometheus',
  'OpenCost',
  'kube-state-metrics',
  'Argo CD',
  'Helm',
  'Karpenter',
  'Cluster Autoscaler',
];

export function Marquee() {
  const row = (
    <div className="flex shrink-0 items-center gap-12 pr-12">
      {ITEMS.map((label) => (
        <span
          key={label}
          className="text-sm font-medium text-white/40 hover:text-white/70 transition-colors whitespace-nowrap"
        >
          {label}
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
        style={{
          background: 'linear-gradient(to right, rgb(10,12,28), transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
        style={{
          background: 'linear-gradient(to left, rgb(10,12,28), transparent)',
        }}
      />
      <div className="flex animate-marquee w-max">
        {row}
        {row}
      </div>
    </div>
  );
}
