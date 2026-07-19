using System;

namespace Messaging.Resilience.Retry
{
    public class RetryBackoffScheduler
    {
        private readonly Random _jitter = new Random();
        private readonly TimeSpan _baseDelay;
        private readonly TimeSpan _maxDelay;

        public RetryBackoffScheduler(TimeSpan baseDelay, TimeSpan maxDelay)
        {
            _baseDelay = baseDelay;
            _maxDelay = maxDelay;
        }

        public TimeSpan NextDelay(int attempt)
        {
            double exponential = _baseDelay.TotalMilliseconds * Math.Pow(2, attempt);
            double capped = Math.Min(exponential, _maxDelay.TotalMilliseconds);
            double withJitter = capped * (0.5 + _jitter.NextDouble() * 0.5);
            return TimeSpan.FromMilliseconds(withJitter);
        }
    }
}
