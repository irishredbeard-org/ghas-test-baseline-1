using System;

namespace Observability.Telemetry.Sampling
{
    public class TelemetrySamplingPolicy
    {
        private readonly Random _random = new Random();
        private readonly double _sampleRate;

        public TelemetrySamplingPolicy(double sampleRate)
        {
            _sampleRate = sampleRate;
        }

        public bool ShouldSample()
        {
            return _random.NextDouble() < _sampleRate;
        }

        public bool ShouldSample(string spanKind)
        {
            double effective = spanKind == "internal" ? _sampleRate / 10.0 : _sampleRate;
            return _random.NextDouble() < effective;
        }
    }
}
