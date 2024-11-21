export default function SpellPost() {
  return (
    <div className="px-4">
      <div className="container mx-auto px-4">
        {/* Title and Metadata */}
        <div className="flex justify-between items-end"> {/* Changed items-start to items-center */}
          {/* Left Title Section */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Affect Normal Fires</h1>
            <h2 className="text-lg text-gray-800">Arcane Transmutation/Alteration</h2>
          </div>

          {/* Right Metadata Section */}
          <div className="text-right text-sm text-gray-600">
            <p>By Elminster</p>
            <p>Published on March 8, 1833</p>
          </div>
        </div>

        {/* Spell Details */}
        <div className="divide-y divide-gray-200 pt-10">
          <div>
            <b>Level:</b> Magic user 1
          </div>
          <div>
            <b>Range:</b> 5
          </div>
          <div>
            <b>Duration:</b> 1
          </div>
          <div>
            <b>Area of Effect:</b> 1.5
          </div>
          <div>
            <b>Components:</b> V
          </div>
          <div>
            <b>Casting Time:</b> 1 segment
          </div>
          <div>
            <b>Saving Throw:</b> None
          </div>
        </div>

        {/* Description */}
        <div className="prose max-w-none pt-10 pb-8">
          <p>
            With arcane words and gestures, the magic user may command small fires, up to a limit of 1½
            ft in radius, to grow smaller or larger. Any fire within the spell’s size limitations may be
            made as small as a candle flame or turned into a bonfire up to 3 ft in diameter.
            An affected fire only consumes fuel appropriate
            to its new size, but will continue to radiate the same heat as a fire of its original size.
          </p>
        </div>
      </div>
    </div>
  );
}
