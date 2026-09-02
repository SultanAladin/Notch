import React, { useState } from "react";
import { useTheme } from "../theme.tsx";
import {
  FormFieldRow,
  FormInput,
  FormSelect,
  FormToggle,
  Slider,
} from "./SharedUI.tsx";
import { X, UploadCloud } from "lucide-react";

export function GenericSettingsModal({
  title,
  subtitle,
  children,
  onClose,
  footerBtn,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onClose?: () => void;
  footerBtn: string;
}) {
  const { colors, accentColor, cornerRadius } = useTheme();

  return (
    <div className={`w-full h-full mx-auto flex flex-col relative`}>
      <div className={`shrink-0 p-8 pb-4 flex justify-between items-start`}>
        <div>
          <h2
            className={`text-2xl font-semibold tracking-tight mb-2 ${colors.text}`}
          >
            {title}
          </h2>
          <p className={`text-sm ${colors.textMuted}`}>{subtitle}</p>
        </div>
        <button
          onClick={onClose}
          className={`p-2 rounded-full border transition-colors hover:bg-white/5 ${colors.panelBorder} ${colors.textMuted}`}
        >
          <X size={16} />
        </button>
      </div>

      <div
        className="flex-1 overflow-y-auto px-8 lg:px-12 py-8 custom-scrollbar"
        style={{ "--scrollbar-color": accentColor } as React.CSSProperties}
      >
        <div className="max-w-3xl">{children}</div>
      </div>

      <div
        className={`shrink-0 p-6 border-t flex justify-between items-center bg-black/20 ${colors.divider}`}
      >
        <div className={`text-[10px] flex gap-3 ${colors.textMuted}`}>
          <span>Ready to apply changes.</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${colors.textMuted} hover:${colors.text}`}
          >
            Discard Changes
          </button>
          <button
            onClick={onClose}
            className={`px-6 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-white/90 active:scale-95 transition-all`}
          >
            {footerBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

export function RenderSettingsModal({ onClose }: { onClose?: () => void }) {
  const [samples, setSamples] = useState(512);
  const [bounces, setBounces] = useState(4);
  const [gi, setGi] = useState(true);
  const [denoise, setDenoise] = useState(true);
  const [bloom, setBloom] = useState(15);
  const [motionBlur, setMotionBlur] = useState(false);

  return (
    <GenericSettingsModal
      title="Render Settings"
      subtitle="Configure output rendering quality and passes."
      onClose={onClose}
      footerBtn="Apply Render Settings"
    >
      <FormFieldRow label="Engine">
        <FormSelect
          options={[
            "Raytraced (Path Tracer)",
            "Rasterizer (Fast)",
            "Unlit (Albedo Only)",
          ]}
        />
      </FormFieldRow>
      <FormFieldRow label="Max Samples">
        <div className="w-full">
          <Slider
            min={1}
            max={4096}
            value={samples}
            onChange={setSamples}
            displayValue={`${samples}`}
          />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Ray Bounces">
        <div className="w-full">
          <Slider
            min={1}
            max={32}
            value={bounces}
            onChange={setBounces}
            displayValue={`${bounces}`}
          />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Global Illumination">
        <div className="flex justify-end w-full">
          <FormToggle active={gi} onChange={setGi} />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Denoise">
        <div className="flex justify-end w-full">
          <FormToggle active={denoise} onChange={setDenoise} />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Bloom Intensity">
        <div className="w-full">
          <Slider
            min={0}
            max={100}
            value={bloom}
            onChange={setBloom}
            displayValue={`${bloom}%`}
          />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Motion Blur">
        <div className="flex justify-end w-full">
          <FormToggle active={motionBlur} onChange={setMotionBlur} />
        </div>
      </FormFieldRow>
    </GenericSettingsModal>
  );
}

export function CameraSettingsModal({ onClose }: { onClose?: () => void }) {
  const { colors } = useTheme();
  const [fov, setFov] = useState(90);
  const [aperture, setAperture] = useState(2.8);
  const [dof, setDof] = useState(true);

  return (
    <GenericSettingsModal
      title="Camera Settings"
      subtitle="Configure viewport optics and properties."
      onClose={onClose}
      footerBtn="Apply Camera Settings"
    >
      <FormFieldRow label="Lens Profile">
        <FormSelect
          options={["Standard (Default)", "Wide Angle", "Telephoto", "Macro"]}
        />
      </FormFieldRow>
      <FormFieldRow label="Focal Length">
        <div className="w-full pr-4 flex items-center gap-4">
          <FormInput value="50" className="max-w-24 text-center" />
          <span className={`text-sm ${colors.textMuted}`}>mm</span>
        </div>
      </FormFieldRow>
      <FormFieldRow label="Field of View">
        <div className="w-full">
          <Slider
            min={15}
            max={160}
            value={fov}
            onChange={setFov}
            displayValue={`${fov}°`}
          />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Aperture (f-stop)">
        <div className="w-full">
          <Slider
            min={1.2}
            max={22}
            value={aperture}
            onChange={setAperture}
            displayValue={`f/${aperture.toFixed(1)}`}
          />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Depth of Field">
        <div className="flex justify-end w-full">
          <FormToggle active={dof} onChange={setDof} />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Clipping Planes">
        <div className="flex gap-4 w-full text-sm items-center">
          <span className={colors.textMuted}>Near</span>
          <FormInput value="0.01" className="flex-1" />
          <span className={colors.textMuted}>Far</span>
          <FormInput value="1000" className="flex-1" />
        </div>
      </FormFieldRow>
    </GenericSettingsModal>
  );
}

export function ImportSettingsModal({ onClose }: { onClose?: () => void }) {
  const { colors } = useTheme();
  return (
    <GenericSettingsModal
      title="Import Assets"
      subtitle="Import meshes, textures, and scene hierarchies."
      onClose={onClose}
      footerBtn="Start Import"
    >
      <FormFieldRow label="File Selection">
        <button
          className={`flex-1 w-full border border-dashed py-10 px-8 rounded-xl flex flex-col items-center gap-3 transition-colors hover:bg-white/5 ${colors.panelBorder}`}
        >
          <UploadCloud size={32} className={colors.textMuted} />
          <span className={`text-sm mt-2 ${colors.textMuted}`}>
            Drag & drop files here or{" "}
            <span className="text-white hover:underline">browse</span>
          </span>
        </button>
      </FormFieldRow>
      <FormFieldRow label="Mesh Types">
        <FormSelect
          options={[
            "All Supported (.fbx, .obj, .gltf)",
            "Autodesk FBX (.fbx)",
            "Wavefront OBJ (.obj)",
            "GL Transmission Format (.gltf)",
          ]}
        />
      </FormFieldRow>
      <FormFieldRow label="Import Normals">
        <div className="flex justify-end w-full">
          <FormToggle active={true} onChange={() => {}} />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Scale Factor">
        <div className="w-full pr-4 flex items-center gap-4">
          <FormInput value="1.0" className="max-w-24 text-center" />
          <span className={`text-sm ${colors.textMuted}`}>x (Multiplier)</span>
        </div>
      </FormFieldRow>
    </GenericSettingsModal>
  );
}

export function TelemetrySettingsModal({ onClose }: { onClose?: () => void }) {
  const { colors } = useTheme();
  return (
    <GenericSettingsModal
      title="Telemetry & Notifications"
      subtitle="System resource overlay and alert preferences."
      onClose={onClose}
      footerBtn="Save Preferences"
    >
      <FormFieldRow label="Show FPS Overlay">
        <div className="flex justify-end w-full">
          <FormToggle active={true} onChange={() => {}} />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Show RAM Usage">
        <div className="flex justify-end w-full">
          <FormToggle active={true} onChange={() => {}} />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Scene Metadata">
        <div className="flex justify-end w-full">
          <FormToggle active={false} onChange={() => {}} />
        </div>
      </FormFieldRow>
      <h3 className={`mt-8 mb-4 text-sm font-medium ${colors.text}`}>Alerts</h3>
      <FormFieldRow label="Baking Complete">
        <div className="flex justify-end w-full">
          <FormToggle active={true} onChange={() => {}} />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Render Finished">
        <div className="flex justify-end w-full">
          <FormToggle active={true} onChange={() => {}} />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Autosave Errors">
        <div className="flex justify-end w-full">
          <FormToggle active={true} onChange={() => {}} />
        </div>
      </FormFieldRow>
    </GenericSettingsModal>
  );
}

export function InputSettingsModal({ onClose }: { onClose?: () => void }) {
  const [profile, setProfile] = useState("Blender (Default)");
  const [customKeybindings, setCustomKeybindings] = useState(true);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [invertY, setInvertY] = useState(false);

  return (
    <div className="w-full h-full mx-auto flex flex-col relative bg-[#161415]">
      <div className="shrink-0 p-8 pb-4 flex justify-between items-start">
        <div className="flex flex-col">
          <h2 className="text-[#ececec] text-2xl font-semibold tracking-tight mb-2">Keybindings Setup</h2>
          <p className="text-[#868384] text-sm mt-1">Configure navigation style and keyboard shortcuts.</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full border transition-colors hover:bg-white/5 border-white/10 text-white/50"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-8 lg:px-12 py-8 custom-scrollbar">
        <div className="max-w-3xl flex flex-col gap-6">
          {/* Input Profile */}
          <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#c4c4c4] text-[13px] w-[140px]">Preset profile<span className="text-[#e254eb] ml-1">*</span></span>
            <div className="flex-1 relative">
              <select 
                className="w-full bg-[#0d0a0b] border border-[#2a2627] text-[#c4c4c4] rounded-lg px-4 py-2.5 outline-none focus:border-[#e254eb] appearance-none"
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
              >
                <option>Blender (Default)</option>
                <option>Maya / Unity</option>
                <option>Unreal Engine</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#868384]"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#c4c4c4] text-[13px] w-[140px]">Mouse Sensitivity<span className="text-[#e254eb] ml-1">*</span></span>
            <div className="flex-1 flex gap-2">
              <div className="flex-1 relative bg-[#0d0a0b] border border-[#2a2627] rounded-lg overflow-hidden flex items-center px-4">
                 <input type="range" className="w-full accent-[#e254eb]" defaultValue={50} />
              </div>
              <input type="text" className="w-16 bg-[#0d0a0b] border border-[#2a2627] text-[#c4c4c4] rounded-lg px-3 py-2.5 text-center outline-none focus:border-[#e254eb]" defaultValue="50%" />
            </div>
          </div>
        </div>

        <div className="h-px bg-[#2a2627] w-full my-1"></div>

        {/* Custom Shortcuts */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[#ececec] text-[14.5px]">Custom Shortcuts</span>
            <button 
              className={`w-11 h-6 rounded-full p-[2px] transition-colors ${customKeybindings ? 'bg-[#e254eb]' : 'bg-[#3b3638]'}`}
              onClick={() => setCustomKeybindings(!customKeybindings)}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${customKeybindings ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </button>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#c4c4c4] text-[13px] w-[140px]">Select Tool</span>
            <div className="flex-1">
              <input type="text" className={`w-full bg-[#0d0a0b] border border-[#2a2627] rounded-lg px-4 py-2.5 outline-none focus:border-[#e254eb] ${customKeybindings ? 'text-[#c4c4c4]' : 'text-[#5a5657] cursor-not-allowed'}`} defaultValue="Q" readOnly={!customKeybindings} />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-[#c4c4c4] text-[13px] w-[140px]">Translate Tool</span>
            <div className="flex-1">
              <input type="text" className={`w-full bg-[#0d0a0b] border border-[#2a2627] rounded-lg px-4 py-2.5 outline-none focus:border-[#e254eb] ${customKeybindings ? 'text-[#c4c4c4]' : 'text-[#5a5657] cursor-not-allowed'}`} defaultValue="W" readOnly={!customKeybindings} />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-[#c4c4c4] text-[13px] w-[140px]">Rotate Tool</span>
            <div className="flex-1">
              <input type="text" className={`w-full bg-[#0d0a0b] border border-[#2a2627] rounded-lg px-4 py-2.5 outline-none focus:border-[#e254eb] ${customKeybindings ? 'text-[#c4c4c4]' : 'text-[#5a5657] cursor-not-allowed'}`} defaultValue="E" readOnly={!customKeybindings} />
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#c4c4c4] text-[13px] w-[140px]">Frame Selected</span>
            <div className="flex-1 relative">
              <input type="text" className={`w-full bg-[#0d0a0b] border border-[#2a2627] rounded-lg px-4 py-2.5 outline-none focus:border-[#e254eb] ${customKeybindings ? 'text-[#c4c4c4]' : 'text-[#5a5657] cursor-not-allowed'}`} defaultValue="Ctrl + Shift + F" readOnly={!customKeybindings} />
            </div>
          </div>
        </div>

        <div className="h-px bg-[#2a2627] w-full my-1"></div>

        {/* Advanced Mode */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
               <span className="text-[#ececec] text-[14.5px]">Advanced Controls</span>
               <span className="text-[#868384] text-[12px] mt-0.5">Enable axis inversion and modifiers</span>
            </div>
            <button 
              className={`w-11 h-6 rounded-full p-[2px] transition-colors ${advancedMode ? 'bg-[#e254eb]' : 'bg-[#3b3638]'}`}
              onClick={() => setAdvancedMode(!advancedMode)}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${advancedMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-[#c4c4c4] text-[13px] w-[140px]">Invert Y-Axis</span>
            <div className="flex-1">
              <div className="w-full bg-[#0d0a0b] border border-[#2a2627] text-[#868384] rounded-lg px-4 py-2.5 flex items-center justify-between">
                <span className="text-[13px]">Flip vertical mouse look</span>
                <button 
                  className={`w-10 h-5 rounded-full p-[2px] transition-colors ${invertY ? 'bg-[#e254eb]' : 'bg-[#3b3638]'}`}
                  onClick={() => setInvertY(!invertY)}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${invertY ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-2 pb-6">
          <button className="text-[#ececec] text-[13px] px-5 py-2.5 border border-[#2a2627] rounded-xl hover:bg-[#2a2627] transition-colors" onClick={onClose}>
            Discard Changes
          </button>
          
          <div className="flex gap-3">
            <button className="text-[#ececec] text-[13px] px-5 py-2.5 border border-[#2a2627] rounded-xl hover:bg-[#2a2627] transition-colors">
              Reset Defaults
            </button>
            <button className="text-white text-[13px] px-5 py-2.5 bg-[#e254eb] rounded-xl hover:bg-[#d143da] transition-colors font-medium">
              Save keybindings
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export function WorkspaceSettingsModal({ onClose }: { onClose?: () => void }) {
  const { colors } = useTheme();
  return (
    <GenericSettingsModal
      title="Display & Workspace"
      subtitle="Configure resolution, scaling, and viewport options."
      onClose={onClose}
      footerBtn="Apply Changes"
    >
      <FormFieldRow label="Resolution Scale">
        <FormSelect
          options={[
            "100% (Native)",
            "200% (Retina/HiDPI)",
            "75% (Performance)",
            "50% (Fast)",
          ]}
        />
      </FormFieldRow>
      <FormFieldRow label="Viewport Framerate">
        <FormSelect
          options={[
            "60 FPS",
            "120 FPS (Smooth)",
            "30 FPS (Power Saving)",
            "Uncapped",
          ]}
        />
      </FormFieldRow>
      <FormFieldRow label="UI Scale">
        <div className="w-full">
          <Slider
            min={50}
            max={150}
            value={100}
            onChange={() => {}}
            displayValue="100%"
          />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Show Grid in Viewport">
        <div className="flex justify-end w-full">
          <FormToggle active={true} onChange={() => {}} />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Anti-Aliasing">
        <FormSelect
          options={["TAA (Temporal)", "FXAA (Fast)", "MSAA 4x", "None"]}
        />
      </FormFieldRow>
    </GenericSettingsModal>
  );
}
