import { Request, Response } from 'express';

const COUPON_PATTERN = /^[A-Z0-9]{4,12}$/;

interface CouponBody {
  code: string;
}

export function validateCoupon(req: Request, res: Response): void {
  const body = req.body as CouponBody;

  if (!COUPON_PATTERN.test(body.code)) {
    res.status(400).json({ valid: false });
    return;
  }

  const normalized = body.code;
  const checksum = [...normalized].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  res.json({ valid: true, code: normalized, checksum: checksum % 97 });
}
