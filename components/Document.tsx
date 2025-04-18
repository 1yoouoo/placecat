import { RippleButton } from '@/components/magicui/ripple-button';
import { MIN_WIDTH } from '@/app/lib/validation';
import { MIN_HEIGHT } from '@/app/lib/validation';
import { MAX_HEIGHT } from '@/app/lib/validation';
import { MAX_WIDTH } from '@/app/lib/validation';

const Document = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-100">Size</h2>
        <div className="space-y-12">
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-300 mb-4">The size can be specified using the format width x height:</p>
            <RippleButton rippleColor="#ADD8E6" textToCopy="https://placecat.1yoouoo.com/400/600">
              https://placecat.1yoouoo.com/400/600
            </RippleButton>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold mb-3 text-gray-200">Square Images</h3>
            <p className="text-gray-300 mb-4">Specifying the height is optional, useful for creating a square:</p>
            <RippleButton rippleColor="#ADD8E6" textToCopy="https://placecat.1yoouoo.com/400">
              https://placecat.1yoouoo.com/400
            </RippleButton>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-200">Size Limits</h3>
            <p className="text-gray-300">
              Maximum image size:{' '}
              <span className="font-medium">
                {MAX_WIDTH} x {MAX_HEIGHT} px
              </span>
              <br />
              Minimum image size:{' '}
              <span className="font-medium">
                {MIN_WIDTH} x {MIN_HEIGHT} px
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-100">Text</h2>
        <div className="space-y-12">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-3 text-gray-200">
              The text can be specified using the format text:
            </h3>
            <RippleButton rippleColor="#ADD8E6" textToCopy="https://placecat.1yoouoo.com/400/600/png?text=Hello">
              https://placecat.1yoouoo.com/400/600/png?text=Hello
            </RippleButton>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-3 text-gray-200">Spaces are represented using +:</h3>
            <RippleButton rippleColor="#ADD8E6" textToCopy="https://placecat.1yoouoo.com/400/600/png?text=Hello+World">
              https://placecat.1yoouoo.com/400/600/png?text=Hello+World
            </RippleButton>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-3 text-gray-200">New lines are represented using \n:</h3>
            <RippleButton rippleColor="#ADD8E6" textToCopy="https://placecat.1yoouoo.com/400/600/png?text=Hello\nWorld">
              https://placecat.1yoouoo.com/400/600/png?text=Hello\nWorld
            </RippleButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document;
