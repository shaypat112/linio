import { SignInButton, UserButton } from "@clerk/nextjs";

export default function BackendPage() {
  return (
    <div>
      <h1>
        Backend Page for <i> linio </i>
      </h1>

      <div className="bg-white">
        <SignInButton />
        <UserButton />
      </div>
    </div>
  );
}
