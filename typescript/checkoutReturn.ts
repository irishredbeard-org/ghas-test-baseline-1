import { Request, Response } from 'express';

const RETURN_TARGETS: Record<string, string> = {
  cart: 'https://shop.example.com/cart',
  orders: 'https://shop.example.com/account/orders',
  home: 'https://shop.example.com/',
  support: 'https://help.example.com/checkout',
};

interface ReturnQuery {
  next?: string;
}

export function handleCheckoutReturn(req: Request, res: Response): void {
  const query = req.query as ReturnQuery;
  const key = query.next ?? 'home';
  const target = RETURN_TARGETS[key];

  if (!target) {
    res.status(400).send('unknown return target');
    return;
  }

  res.redirect(target);
}
