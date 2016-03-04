using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ICSharpCode.NRefactory.CSharp;
using ICSharpCode.NRefactory.CSharp.Resolver;
using ICSharpCode.NRefactory.Semantics;
using ICSharpCode.NRefactory.TypeSystem;

namespace Bridge.Translator
{
    public class TypeVariable : IVariable, IEquatable<TypeVariable>, IEquatable<IVariable>
    {
        private readonly IType typeVar;
        public TypeVariable(IType type)
        {
            this.typeVar = type;
        }
        public ISymbolReference ToReference()
        {
            throw new NotImplementedException();
        }

        public SymbolKind SymbolKind 
        {
            get
            {
                return SymbolKind.TypeParameter;
            }
        }

        string IVariable.Name
        {
            get
            {
                return this.typeVar.Name;
            }
        }

        public DomRegion Region
        {
            get { return default(DomRegion); }
        }

        public IType Type
        {
            get { return this.typeVar; }
        }

        public bool IsConst
        {
            get { return false; }
        }

        public object ConstantValue
        {
            get { return null; }
        }

        string ISymbol.Name
        {
            get
            {
                return this.typeVar.Name;
            }
        }

        public bool Equals(TypeVariable other)
        {
            return this.typeVar.Equals(other.typeVar);
        }

        public bool Equals(IVariable other)
        {
            var typeVariable = other as TypeVariable;
            if (typeVariable != null)
            {
                return this.Equals(typeVariable);
            }

            return false;
        }

        public override int GetHashCode()
        {
            return this.typeVar.GetHashCode();
        }
    }

    public class CaptureAnalyzer : DepthFirstAstVisitor
    {
        private bool _usesThis;
        private HashSet<IVariable> _usedVariables = new HashSet<IVariable>();
        private List<string> _variables = new List<string>();

        public bool UsesThis { get { return _usesThis; } }
        public HashSet<IVariable> UsedVariables { get { return _usedVariables; } }
        public List<string> Variables { get { return _variables; } }
        private CSharpAstResolver resolver;

        public CaptureAnalyzer(CSharpAstResolver resolver)
        {
            this.resolver = resolver;
        }
        
        public void Analyze(AstNode node, IEnumerable<string> parameters = null)
        {
            _usesThis = false;
            _usedVariables.Clear();
            _variables.Clear();

            if (parameters != null)
            {
                foreach (var parameter in parameters)
                {
                    _variables.Add(parameter);
                }
            }

            node.AcceptVisitor(this);
        }

        public override void VisitTypeReferenceExpression(TypeReferenceExpression typeReferenceExpression)
        {
            this.CheckType(typeReferenceExpression.Type);
            base.VisitTypeReferenceExpression(typeReferenceExpression);
        }

        public override void VisitComposedType(ComposedType composedType)
        {
            this.CheckType(composedType);
            base.VisitComposedType(composedType);
        }

        public override void VisitPrimitiveType(PrimitiveType primitiveType)
        {
            this.CheckType(primitiveType);
            base.VisitPrimitiveType(primitiveType);
        }

        public override void VisitSimpleType(SimpleType simpleType)
        {
            this.CheckType(simpleType);
            base.VisitSimpleType(simpleType);
        }

        public override void VisitMemberType(MemberType memberType)
        {
            this.CheckType(memberType);
            base.VisitMemberType(memberType);
        }

        public void CheckType(AstType type)
        {
            var rr = this.resolver.Resolve(type);

            if (rr.Type.Kind == TypeKind.TypeParameter)
            {
                var ivar = new TypeVariable(rr.Type);
                if (!_usedVariables.Contains(ivar))
                {
                    _usedVariables.Add(ivar);
                }
            }
        }

        public override void VisitIdentifierExpression(IdentifierExpression identifierExpression)
        {
            var rr = this.resolver.Resolve(identifierExpression);

            var localResolveResult = rr as LocalResolveResult;
            if (localResolveResult != null)
            {
                if (!_variables.Contains(localResolveResult.Variable.Name) && !_usedVariables.Contains(localResolveResult.Variable))
                {
                    _usedVariables.Add(localResolveResult.Variable);
                }
            }
            else if (rr is ThisResolveResult)
            {
                _usesThis = true;
            }

            base.VisitIdentifierExpression(identifierExpression);
        }


        public override void VisitVariableDeclarationStatement(VariableDeclarationStatement variableDeclarationStatement)
        {
            foreach (var variable in variableDeclarationStatement.Variables)
            {
                _variables.Add(variable.Name);
            }
            base.VisitVariableDeclarationStatement(variableDeclarationStatement);
        }

        public override void VisitLambdaExpression(LambdaExpression lambdaExpression)
        {
            var analyzer = new CaptureAnalyzer(this.resolver);
            analyzer.Analyze(lambdaExpression.Body, lambdaExpression.Parameters.Select(p => p.Name));

            foreach (var usedVariable in analyzer.UsedVariables)
            {
                if (!_variables.Contains(usedVariable.Name) && !_usedVariables.Contains(usedVariable))
                {
                    _usedVariables.Add(usedVariable);
                }
            }

            if (analyzer.UsesThis)
            {
                this._usesThis = true;
            }

            //base.VisitLambdaExpression(lambdaExpression);
        }

        public override void VisitAnonymousMethodExpression(AnonymousMethodExpression anonymousMethodExpression)
        {
            var analyzer = new CaptureAnalyzer(this.resolver);
            analyzer.Analyze(anonymousMethodExpression.Body, anonymousMethodExpression.Parameters.Select(p => p.Name));

            foreach (var usedVariable in analyzer.UsedVariables)
            {
                if (!_variables.Contains(usedVariable.Name) && !_usedVariables.Contains(usedVariable))
                {
                    _usedVariables.Add(usedVariable);
                }
            }

            if (analyzer.UsesThis)
            {
                this._usesThis = true;
            }

            //base.VisitAnonymousMethodExpression(anonymousMethodExpression);
        }
    }

}
