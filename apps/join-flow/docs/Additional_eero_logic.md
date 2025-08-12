# Additional eero logic in Join Flow V2

When we call Kraken to receive our quote, we get back three options from kraken EERO_MESH_ROUTER_X1, EERO_MESH_ROUTER_X2 and EERO_MESH_ROUTER_X3 which relate to the number of eeros an order has.

In the old website, we would use EERO_MESH_ROUTER_X1 to state we have one eero router in our order (this is the included one we get) and adding additional eero routers would increment the total number of eeros in our order.

For example:

- If we had a total of two routers in our order (the included router and an additional router) then we would send to Kraken EERO_MESH_ROUTER_X2
- If we had a total of three routers in our order (the included router and two additional routers) then we would send to Kraken EERO_MESH_ROUTER_X3

However, this logic has changed in Join Flow V2

In Join Flow V2, we use EERO_MESH_ROUTER_X0 to state we have one eero router in our order and not update the basket in Payload to have any additional extras. This value is purely for UI/logic purposes and does not get sent to Kraken.

When we add additional eero routers to our order, it works like this now:

- If we had a total of two routers in our order (the included router and an additional router) then we would send to Kraken EERO_MESH_ROUTER_X1
- If we had a total of three routers in our order (the included router and two additional routers) then we would send to Kraken EERO_MESH_ROUTER_X2
