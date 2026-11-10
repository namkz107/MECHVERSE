# Original engineering illustrations — assembly specifications

These are MECHVERSE-authored nominal designs for visual study, not commercial products, production drawings or verified strength/safety designs. Units metres, Y up, front +Z. Material appearance is independent of technical grade; grade, tolerance, load rating and certification are unspecified. Revision 1. No electrical internals.

## MV-LK02 — two compartment locker (V1)

Nominal body 500 W × 450 D × 1800 H mm, excluding handle/hinge projections. Body above 80 mm plinth; 1.5 mm illustrative folded sheet; inward returns ~18 mm. Welded shell comprises back, sides, top, bottom, centre separator and front opening rails. These members remain fixed in explode. Two vertically stacked doors have 3–5 mm visible opening gaps and ~18 mm returns, pierced ventilation slots and a lock bore. Upper/lower compartment floors and removable shelf are visible when doors open. Cam is displayed pointing down in the released position so the door can clear its jamb; locking/unlocking is not animated or assessed.

Front sketch: [upper door, hinge left, handle right] / centre rail / [lower door, hinge left, handle right]. Side sketch: front door at Z≈0.228, body depth ends ±0.225; rear panel at Z=-0.224. Door pivot X=-0.231, vertical Y axis, rest 0°, opens outward by negative rotation, limit 105°. Two hinge knuckles per door; fixed leaves attach to shell, moving leaf/knuckles attach to door. Handle bridge, lock cylinder/cam and nameplate follow door. Lock visualization does not claim security performance. Hinge leaves and handle have fasteners only at mounting positions.

Exploded presentation: welded shell stays assembled; door assemblies move forward and sideways as complete removable assemblies (hinge pins conceptually released), shelf forward/up, plinth cover forward. No claim of a validated removal sequence. Door opening disabled while exploded, and requesting explode closes doors first. Rest transforms remain immutable. Close-up: vent through-cuts/thickness, hinge knuckles/pivot, handle and cam.

## MV-WB01 — workbench (V2, after locker QA)

Envelope 1500 W × 700 D × 900 H mm; 40 mm illustrative laminated wood top. Welded frame from 40×40 mm hollow sections with 2 mm nominal walls, four posts, top perimeter rails, lower rails and rear diagonal bracing. Frame stays one welded assembly during explode; joints/weld locations shown as an illustration, no weld specification or load capacity assigned.

Top supported by eight tabs with holes and through-fixings to corresponding top counterbores; fasteners have separate occurrence IDs. Four threaded-foot representations have a visible stem/nut/pad (threads omitted); no animation of adjustment without a limit model. Removable folded lower tray rests on lower rails; top and tray have separate explode offsets; welded members do not fly apart. Under-top camera and joint close-up explain the load path and fixed/removable distinction. No motor/rotation capability.

## Geometry/runtime contract

Each selectable occurrence maps to a GLB node with occurrenceId. Children use local transforms; door node origin is the hinge pivot. Order: rest translation + local explode translation, then rest rotation × joint rotation, then child rest transform. Multiple meshes per occurrence allowed; geometry merged only within that occurrence/material. No instancing used, so repeat fasteners retain independent selection. Per-part feature edges exclude coplanar triangulation. Moderate tessellation, no helical threads or distant microdetails; measure before adding LOD/BVH/compression.
